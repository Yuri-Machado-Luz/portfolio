import { QuartzConfig } from './quartz/cfg';
import * as Plugin from './quartz/plugins';

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
	configuration: {
		pageTitle: 'Yuma Hub',
		pageTitleSuffix: '',
		enableSPA: true,
		enablePopovers: true,
		analytics: null,
		locale: 'pt-BR',
		baseUrl: 'yuma-main-hall.vercel.app',
		ignorePatterns: ['private', 'templates', '.obsidian'],
		defaultDateType: 'modified',
		theme: {
			fontOrigin: 'googleFonts',
			cdnCaching: true,
			typography: {
				header: 'Schibsted Grotesk',
				body: 'Source Sans Pro',
				code: 'IBM Plex Mono',
			},
			colors: {
				lightMode: {
					light: '#ffffffff', // --color-bg: --neutral-50 / --neutral-100
					lightgray: '#e8e6e4ff', // borders: --neutral-250
					gray: '#555555ff', // text-muted: --neutral-500/--neutral-600
					darkgray: '#000000ff', // text-main: --neutral-900
					dark: '#bf0603ff', // primary: --primary (hover, headers)
					secondary: '#04bfa9ff', // secondary: --secondary
					tertiary: '#f9c80eff', // accent: --accent
					highlight: 'rgba(191, 6, 3, 0.15)', // primary with low opacity
					textHighlight: '#f9c80e88', // accent with transparency
				},
				darkMode: {
					light: '#000000ff', // --color-bg: --neutral-900
					lightgray: '#343434ff', // borders: --neutral-700
					gray: '#9fa0a3ff', // text-muted: --neutral-450
					darkgray: '#ffffffff', // text-main: --neutral-100
					dark: '#bf0603ff', // primary: --primary (hover, headers)
					secondary: '#04bfa9ff', // secondary: --secondary
					tertiary: '#f9c80eff', // accent: --accent
					highlight: 'rgba(191, 6, 3, 0.15)', // primary with low opacity
					textHighlight: '#f9c80e88', // accent with transparency
				},
			},
		},
	},
	plugins: {
		transformers: [
			Plugin.FrontMatter(),
			Plugin.CreatedModifiedDate({
				priority: ['frontmatter', 'git', 'filesystem'],
			}),
			Plugin.SyntaxHighlighting({
				theme: {
					light: 'github-light',
					dark: 'github-dark',
				},
				keepBackground: false,
			}),
			Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
			Plugin.GitHubFlavoredMarkdown(),
			Plugin.TableOfContents(),
			Plugin.CrawlLinks({ markdownLinkResolution: 'shortest' }),
			Plugin.Description(),
			Plugin.Latex({ renderEngine: 'katex' }),
		],
		filters: [Plugin.RemoveDrafts()],
		emitters: [
			Plugin.AliasRedirects(),
			Plugin.ComponentResources(),
			Plugin.ContentPage(),
			Plugin.FolderPage(),
			Plugin.TagPage(),
			Plugin.ContentIndex({
				enableSiteMap: true,
				enableRSS: true,
			}),
			Plugin.Assets(),
			Plugin.Static(),
			Plugin.Favicon(),
			Plugin.NotFoundPage(),
			// Comment out CustomOgImages to speed up build time
			Plugin.CustomOgImages(),
		],
	},
};

export default config;
