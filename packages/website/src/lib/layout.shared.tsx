import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

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
        text: "Playground",
        url: "/spac/playground",
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
