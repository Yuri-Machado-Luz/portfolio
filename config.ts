import { QuartzConfig } from "./src/cfg";
import * as Plugin from "./src/plugins";
import { byOrderThenAlphabetical } from "./src/components/PageList";

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Yuri Machado",
    pageTitleSuffix: " - Yuri Machado Luz",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "pt-BR",
    baseUrl: "yuma-main-hall.vercel.app",
    ignorePatterns: ["private", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#040404", // --color-bg: --neutral-900
          lightgray: "#343434ff", // borders: --neutral-700
          gray: "#9fa0a3ff", // text-muted: --neutral-450
          darkgray: "#CFCFCF", // text-main: --neutral-100
          dark: "#FFFFFF", // primary: --primary (hover, headers)
          secondary: "#FB1B1Bee", // secondary: --secondary
          tertiary: "#04CEB6", // accent: --accent
          highlight: "rgba(191, 6, 3, 0.15)", // primary with low opacity
          textHighlight: "#FB1B1B80", // accent with transparency
        },
        darkMode: {
          light: "#040404", // --color-bg: --neutral-900
          lightgray: "#343434ff", // borders: --neutral-700
          gray: "#9fa0a3ff", // text-muted: --neutral-450
          darkgray: "#CFCFCF", // text-main: --neutral-100
          dark: "#FFFFFF", // primary: --primary (hover, headers)
          secondary: "#FB1B1Bee", // secondary: --secondary
          tertiary: "#04CEB6", // accent: --accent
          highlight: "rgba(191, 6, 3, 0.15)", // primary with low opacity
          textHighlight: "#FB1B1B80", // accent with transparency
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-dark",
          dark: "github-dark",
        },
        keepBackground: true,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        sort: byOrderThenAlphabetical(),
      }),
      Plugin.TagPage({
        sort: byOrderThenAlphabetical(),
      }),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
};

export default config;
