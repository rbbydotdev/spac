import { useRef, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react'
import { useQueryState } from 'nuqs'
import { ChevronDown, Orbit } from 'lucide-react'
import { Panel, Group, Separator } from 'react-resizable-panels'
import { CodeMirrorPane, type CodeMirrorPaneHandle } from './CodeMirrorPane'
import { FileExplorer, type FileExplorerHandle } from './FileExplorer'
import { useSourceMap } from '../hooks/useSourceMap'
import { useFileLoader } from '../hooks/useFileLoader'
import { useTsWorker } from '../hooks/useTsWorker'
import { createFsFromFileList } from '../lib/fs'
import { tsHoverTooltip, tsGotoDefinition, tsIntellisenseTheme, type GotoDefinitionTarget, type TsClientRef } from '../extensions/ts-intellisense'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Spinner } from './Spinner'
import { HelpDialog } from './HelpDialog'
import type { Manifest, SourceTableEntry } from '../types'

export interface ExampleOption {
  value: string
  label: ReactNode
}

interface SpacViewerProps {
  manifest: Manifest
  example: string
  examples: ExampleOption[]
  loading?: boolean
  progress?: number | null
  onSwitchExample: (name: string) => void
}

export function SpacViewer({ manifest, example, examples, loading, progress, onSwitchExample }: SpacViewerProps) {
  const { files, yaml: yamlText, sourceMap, sourceTable } = manifest
  const tsRef = useRef<CodeMirrorPaneHandle>(null)
  const yamlRef = useRef<CodeMirrorPaneHandle>(null)
  const explorerRef = useRef<FileExplorerHandle>(null)
  const { yamlToTs, tsToYaml } = useSourceMap(sourceMap)
  const { activeFile, activeContent, openFile } = useFileLoader(example)
  const [breadcrumb, setBreadcrumb] = useState<string | null>(null)
  const [activePane, setActivePane] = useState<'ts' | 'yaml' | null>(null)
  const [initialHighlightLine, setInitialHighlightLine] = useState<number | undefined>(undefined)

  const [fileParam, setFileParam] = useQueryState('file')

  const { client: tsClient } = useTsWorker(files, example)
  // Ref so CodeMirror extensions always access the latest client (may arrive after mount)
  const tsClientRef = useRef<TsClientRef['current']>(tsClient)
  tsClientRef.current = tsClient

  const memFs = useMemo(() => createFsFromFileList(files), [files])

  const findEntryByTsLine = useCallback((source: string, tsLine: number) => {
    let best: SourceTableEntry | null = null
    let bestDist = Infinity
    for (const entry of sourceTable) {
      if (entry.source.file !== source) continue
      const dist = Math.abs(tsLine - entry.source.line)
      if (dist < bestDist) {
        bestDist = dist
        best = entry
      }
    }
    return bestDist <= 3 ? best : null
  }, [sourceTable])

  const handleFileSelect = useCallback(async (path: string) => {
    const filePath = path.startsWith('/') ? path.slice(1) : path
    if (!files.includes(filePath)) return
    setInitialHighlightLine(undefined)
    await openFile(filePath)
    setFileParam(filePath)
  }, [files, openFile, setFileParam])

  const handleYamlLineClick = useCallback(async (line: number) => {
    setActivePane('yaml')
    const tsPos = yamlToTs(line)
    if (tsPos) {
      if (tsPos.source !== activeFile) {
        setInitialHighlightLine(tsPos.line)
        await openFile(tsPos.source)
        setFileParam(tsPos.source)
      } else {
        setInitialHighlightLine(undefined)
        tsRef.current?.highlightLine(tsPos.line)
      }
      // Reveal the source file in the tree and scroll to it
      explorerRef.current?.revealAndScroll('/' + tsPos.source)
      const entry = findEntryByTsLine(tsPos.source, tsPos.line)
      setBreadcrumb(entry ? entry.path : null)
    } else {
      setBreadcrumb(null)
    }
  }, [yamlToTs, activeFile, openFile, setFileParam, findEntryByTsLine])

  const handleTsLineClick = useCallback((line: number) => {
    if (!activeFile) return
    setActivePane('ts')
    const yamlPos = tsToYaml(activeFile, line)
    const entry = findEntryByTsLine(activeFile, line)
    if (yamlPos && (yamlPos.exact || entry)) {
      yamlRef.current?.highlightLine(yamlPos.line)
    }
    setBreadcrumb(entry ? entry.path : null)
  }, [tsToYaml, activeFile, findEntryByTsLine])

  // Cmd/Ctrl+Click go-to-definition handler
  const handleGotoDefinition = useCallback(async (target: GotoDefinitionTarget) => {
    // target.fileName is like "/project/petstore.ts" — strip the /project/ prefix
    const file = target.fileName.replace(/^\/project\//, '')
    if (!files.includes(file)) return

    const content = await openFile(file)
    setFileParam(file)
    explorerRef.current?.revealAndScroll('/' + file)

    // Convert character offset to line number
    let line = 1
    for (let i = 0; i < target.offset && i < content.length; i++) {
      if (content[i] === '\n') line++
    }

    if (file === activeFile) {
      // Same file — scroll directly (pane won't remount)
      tsRef.current?.highlightLine(line)
    } else {
      // Different file — pane remounts, use initialHighlightLine
      setInitialHighlightLine(line)
    }
  }, [files, openFile, setFileParam, activeFile])

  // Read fileParam via ref so the effect doesn't re-run when we set it
  const fileParamRef = useRef(fileParam)
  fileParamRef.current = fileParam

  // Auto-open file on mount or when files list changes (new manifest loaded)
  useEffect(() => {
    const param = fileParamRef.current
    const target = param && files.includes(param) ? param : files[0]
    if (target) {
      openFile(target).then(() => setFileParam(target))
    }
  }, [files, openFile, setFileParam])

  // Build TS intellisense extensions for the active file.
  // Uses tsClientRef so extensions work even when the worker becomes ready after mount.
  const projectFiles = useMemo(() => files.map(f => `/project/${f}`), [files])
  const handleGotoDefRef = useRef(handleGotoDefinition)
  handleGotoDefRef.current = handleGotoDefinition
  const tsExtensions = useMemo(() => {
    if (!activeFile) return undefined
    const fileName = `/project/${activeFile}`
    return [
      tsHoverTooltip(tsClientRef, fileName),
      ...tsGotoDefinition(tsClientRef, fileName, projectFiles, (t) => handleGotoDefRef.current(t)),
      tsIntellisenseTheme,
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFile, projectFiles])

  const stats = useMemo(() => ({
    files: files.length,
    paths: new Set(sourceTable.filter(e => e.kind === 'route').map(e => {
      const parts = e.path.split('.')
      return parts.slice(0, 2).join('.')
    })).size,
    schemas: sourceTable.filter(e => e.kind === 'schema').length,
    mappings: sourceTable.length,
  }), [files, sourceTable])

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>
        <FileExplorer
          ref={explorerRef}
          fs={memFs}
          selectedPath={activeFile ? '/' + activeFile : null}
          onFileSelect={handleFileSelect}
        />

        <SidebarInset className="flex flex-col h-screen min-w-0">
          {/* Header */}
          <header className="flex items-center justify-between border-b px-3 py-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <div className="h-4 w-px bg-border" />
              <a href="/spac/" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-primary transition-colors" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.05em' }}><Orbit className="size-4" />spac</a>
              <span className="text-xs text-muted-foreground">playground</span>
              <HelpDialog />

              {/* Example switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium hover:bg-accent transition-colors cursor-pointer">
                  {example}
                  <ChevronDown className="size-3 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-auto">
                  {examples.map(opt => (
                    <DropdownMenuItem
                      key={opt.value}
                      onClick={() => onSwitchExample(opt.value)}
                      className="whitespace-nowrap"
                    >
                      <span className={opt.value === example ? 'font-medium' : ''}>{opt.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {activeFile && <span className="text-xs text-muted-foreground">{activeFile}</span>}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{stats.files} files</span>
              <span>{stats.paths} paths</span>
              <span>{stats.schemas} schemas</span>
              <span>{stats.mappings} mappings</span>
            </div>
          </header>

          {/* Content area — relative for loading overlay */}
          <div className="relative flex-1 flex flex-col min-h-0">
            {/* Breadcrumb / helper text */}
            <div className="border-b bg-muted/50 px-4 py-1.5">
              {breadcrumb ? (
                <span className="font-mono text-xs text-muted-foreground">
                  {breadcrumb.split('.').map((part, i, arr) => (
                    <span key={i}>
                      {i > 0 && <span className="mx-1 text-muted-foreground/50">&rsaquo;</span>}
                      <span className={i === arr.length - 1 ? 'text-foreground font-medium' : ''}>
                        {part}
                      </span>
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground/70">
                  Click any line in either pane to highlight the corresponding line in the other. SPAC source on the left, generated OpenAPI YAML on the right.
                </span>
              )}
            </div>

            {/* Panels */}
            <Group orientation="horizontal" className="flex-1">
              <Panel defaultSize="50%" minSize="20%">
                <div className="flex h-full flex-col">
                  <div className={`flex items-center border-b px-3 py-1.5 text-xs ${activePane === 'ts' ? 'bg-muted/50' : ''}`}>
                    <span className="font-medium">{activeFile ?? 'No file selected'}</span>
                    {activeFile && <span className="ml-2 text-muted-foreground">TypeScript</span>}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {activeContent != null ? (
                      <CodeMirrorPane
                        key={activeFile}
                        ref={tsRef}
                        value={activeContent}
                        language="typescript"

                        onLineClick={handleTsLineClick}
                        initialHighlightLine={initialHighlightLine}
                        extraExtensions={tsExtensions}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        Select a file to view
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <Separator className="w-1.5 bg-border hover:bg-primary/20 transition-colors cursor-col-resize" />

              <Panel defaultSize="50%" minSize="20%">
                <div className="flex h-full flex-col">
                  <div className={`flex items-center border-b px-3 py-1.5 text-xs ${activePane === 'yaml' ? 'bg-muted/50' : ''}`}>
                    <span className="font-medium">openapi.yaml</span>
                    <span className="ml-2 text-muted-foreground">YAML</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <CodeMirrorPane
                      ref={yamlRef}
                      value={yamlText}
                      language="yaml"
                      onLineClick={handleYamlLineClick}
                    />
                  </div>
                </div>
              </Panel>
            </Group>

            {/* Loading overlay — blurs content, keeps toolbar usable */}
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm animate-in fade-in-0 duration-150">
                <Spinner progress={progress} />
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
