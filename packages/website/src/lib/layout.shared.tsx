import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ExternalLink, Zap } from "lucide-react";

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
    links: [
      {
        text: (
          <span className="inline-flex items-center gap-1">
            Playground
            <ExternalLink className="size-3" />
          </span>
        ),
        url: "/spac/playground",
        external: true,
      },
      {
        type: "icon",
        icon: <Zap className="size-4" />,
        label: "rbby.dev",
        text: "rbby.dev",
        url: "https://rbby.dev",
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
