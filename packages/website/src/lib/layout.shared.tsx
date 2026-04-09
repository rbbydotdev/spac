import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookOpen, SquareTerminal, Zap } from "lucide-react";

export const gitConfig = {
  user: "rbbydotdev",
  repo: "spac",
  branch: "master",
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span
          style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          spac
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: (
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-4" />
            Documentation
          </span>
        ),
        url: "/docs",
      },
      {
        text: (
          <span className="inline-flex items-center gap-1.5">
            <SquareTerminal className="size-4" />
            Playground
          </span>
        ),
        url: "https://rbby.dev/spac/playground",
        external: true,
      },
      {
        text: (
          <span className="inline-flex items-center gap-1.5">
            <Zap className="size-4" />
            rbby.dev
          </span>
        ),
        url: "https://rbby.dev",
        external: true,
      },
    ],
  };
}
