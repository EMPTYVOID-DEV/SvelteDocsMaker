<script lang="ts">
	import CoreMd from '../md/coreMd.svelte';
	import Toc from './toc.svelte';
	import SectionsSlider from './sectionsMenu.svelte';
	import MobileToc from './mobileToc.svelte';
	import NavBar from './navBar.svelte';
	import Location from './Location.svelte';
	import QuickNav from './quickNav.svelte';
	import { getColorLevels } from '../../extra/utils';
	import { githubDark, github } from 'svelte-highlight/styles';
	import { setContext, type ComponentType, SvelteComponent } from 'svelte';
	import { MobileMenuAppear, theme } from '../../extra/themeStore';

	// page content
	export let data: {
		md: string;
		toc: {
			degree: number;
			name: string;
		}[];
	};
	export let sectionsMap: Map<string, string[]>;
	export let pathname: string;

	// custom components
	export let mdHandlers: {
		image?: ComponentType<SvelteComponent<{ href: string; text: string }>>;
		link?: ComponentType<SvelteComponent<{ href: string }>>;
		list?: ComponentType<SvelteComponent<{ ordered: boolean; start: number }>>;
		blockquote?: ComponentType<SvelteComponent>;
		code?: ComponentType<SvelteComponent<{ text: string; lang: string }>>;
		codespan?: ComponentType<SvelteComponent<{ raw: string }>>;
		heading?: ComponentType<SvelteComponent<{ text: string; depth: number }>>;
		table?: ComponentType<SvelteComponent>;
	} = {};
	export let CustomToc: null | ComponentType<
		SvelteComponent<{
			links: {
				name: string;
				degree: number;
			}[];
			navBarHeight: number;
		}>
	> = null;
	export let CustomSectionsMenu: null | ComponentType<
		SvelteComponent<{ sectionsMap: Map<string, string[]>; pathname: string }>
	> = null;
	export let CustomLocation: null | ComponentType<SvelteComponent<{ pathname: string }>> = null;
	export let CustomQuickNav: null | ComponentType<
		SvelteComponent<{ sectionsMap: Map<string, string[]>; pathname: string }>
	> = null;
	export let CustomNavBar: null | ComponentType<SvelteComponent> = null;

	// colors and themes
	export let lightBgColor: string = '#dfe2ec';
	export let darkBgColor: string = '#152038';
	export let lightPrimary: string = '#3366FF';
	export let darkPrimary: string = '#9f7cdc';
	export let darkFontColor: string = '#f0e8e8';
	export let lightFontColor: string = '#140f0e';
	export let navBarHeight: number = 100;
	export let darkCodeTheme: string = githubDark;
	export let lightCodeTheme: string = github;

	// Typography props
	export let h1: string = 'clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)';
	export let h2: string = 'clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem)';
	export let h3: string = 'clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem)';
	export let h4: string = 'clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)';
	export let body: string = 'clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem)';

	// header Margin props
	export let Mth1: string = '1.5rem';
	export let Mbh1: string = '1.25rem';
	export let Mth2: string = '1.25rem';
	export let Mbh2: string = '1rem';
	export let Mth3: string = '1rem';
	export let Mbh3: string = '0.5rem';
	export let Mth4: string = '0.75rem';
	export let Mbh4: string = '0.25rem';

	// Line height props
	export let lh1: number = 1.3;
	export let lh2: number = 1.35;
	export let lh3: number = 1.4;
	export let lh4: number = 1.5;
	export let lhbody: number = 1.6;

	//font family
	export let headingFont: string = `Verdana, sans-serif`;
	export let bodyFont: string = `Helvetica, sans-serif`;

	// layout sizes
	export let gridColumns: {
		sectionsNav: string;
		markdown: string;
		toc: string;
		gap: string;
		paddingLeft: string;
		paddingRight: string;
	} = {
		sectionsNav: '24%',
		markdown: '54%',
		toc: '20%',
		gap: '10px',
		paddingLeft: '1%',
		paddingRight: '0'
	};

	// navbar settings
	export let navlinks: {
		label: string;
		href: string;
	}[] = [];
	export let logo: ComponentType<SvelteComponent<{ mode: boolean }>>;
	export let githubLink = '';
	export let discordLink = '';
	export let npmLink = '';
	export let doubleMode = true;

	// setting theme as context
	setContext('lightCodeTheme', lightCodeTheme);
	setContext('darkCodeTheme', darkCodeTheme);
	$: primaryColors = $theme ? getColorLevels(lightPrimary) : getColorLevels(darkPrimary);
</script>

<div
	class="docs"
	style="
	    --primary800:{primaryColors[0]};
	    --primary400:{primaryColors[1]};
	    --primary100:{primaryColors[2]};
	    --bg:{$theme ? lightBgColor : darkBgColor}; 
		--font:{$theme ? lightFontColor : darkFontColor}; 

		--h1: {h1};
        --h2: {h2};
        --h3: {h3};
        --h4: {h4};
        --body: {body};

        --Mth1: {Mth1};
        --Mbh1: {Mbh1};
        --Mth2: {Mth2};
        --Mbh2: {Mbh2};
        --Mth3: {Mth3};
        --Mbh3: {Mbh3};
        --Mth4: {Mth4};
        --Mbh4: {Mbh4};

        --lh1: {lh1};
        --lh2: {lh2};
        --lh3: {lh3};
        --lh4: {lh4};
        --lhbody: {lhbody};

		--headingFont:{headingFont} ;
		--bodyFont:{bodyFont};

	"
>
	<div id="navWrapper" style="height: {navBarHeight}px;">
		{#if CustomNavBar}
			<CustomNavBar />
		{:else}
			<NavBar links={navlinks} {logo} {githubLink} {npmLink} {discordLink} {doubleMode} />
		{/if}
	</div>
	{#if $MobileMenuAppear}
		<div class="mobileSideBar">
			{#if CustomSectionsMenu}
				<CustomSectionsMenu {pathname} {sectionsMap} />
			{:else}
				<SectionsSlider {pathname} {sectionsMap} />
			{/if}
		</div>
	{:else}
		<div
			id="main"
			style="grid-template-columns:{gridColumns.sectionsNav} {gridColumns.markdown} {gridColumns.toc}; gap:{gridColumns.gap};padding-left:{gridColumns.paddingLeft};padding-right:{gridColumns.paddingRight};"
		>
			<div class="sideWrapper" style="top: {navBarHeight}px;">
				<div id="sidebar" style="max-height: calc(95vh - {navBarHeight}px);">
					{#if CustomSectionsMenu}
						<CustomSectionsMenu {sectionsMap} {pathname} />
					{:else}
						<SectionsSlider {sectionsMap} {pathname} />
					{/if}
				</div>
			</div>
			<div id="markdown">
				{#if CustomLocation}
					<CustomLocation {pathname} />
				{:else}
					<Location {pathname} />
				{/if}
				{#key data}
					<CoreMd source={data.md} {mdHandlers} />
				{/key}
				{#if CustomQuickNav}
					<CustomQuickNav {pathname} {sectionsMap} />
				{:else}
					<QuickNav {pathname} {sectionsMap} />
				{/if}
			</div>
			<div id="mobileToc" style="top: {navBarHeight}px;">
				<MobileToc links={data.toc} {navBarHeight} />
			</div>
			<div id="toc" style="top: {navBarHeight}px;">
				{#if CustomToc}
					<CustomToc links={data.toc} {navBarHeight} />
				{:else}
					<Toc links={data.toc} {navBarHeight} />
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.docs :global(::-webkit-scrollbar) {
		width: 0.5rem;
	}
	.docs :global(::-webkit-scrollbar-track) {
		border-radius: 12px;
		background: var(--primary100);
	}
	.docs :global(::-webkit-scrollbar-thumb) {
		border-radius: 12px;
		background: var(--primary800);
	}

	.docs :global(*) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.docs :global(h1),
	.docs :global(h2),
	.docs :global(h3),
	.docs :global(h4) {
		font-family: var(--headingFont);
		font-weight: bold;
		color: var(--font);
	}

	.docs :global(h1) {
		font-size: var(--h1);
		line-height: var(--lh1);
		margin-top: var(--Mth1);
		margin-bottom: var(--Mbh1);
	}
	.docs :global(h2) {
		font-size: var(--h2);
		line-height: var(--lh2);
		margin-top: var(--Mth2);
		margin-bottom: var(--Mbh2);
	}
	.docs :global(h3) {
		font-size: var(--h3);
		line-height: var(--lh3);
		margin-top: var(--Mth3);
		margin-bottom: var(--Mbh3);
	}
	.docs :global(h4) {
		font-size: var(--h4);
		line-height: var(--lh4);
		margin-top: var(--Mth4);
		margin-bottom: var(--Mbh4);
	}

	.docs :global(p),
	.docs :global(a),
	.docs :global(span),
	.docs :global(li),
	.docs :global(code) {
		font-family: var(--bodyFont);
		font-size: var(--body);
		line-height: var(--lhbody);
		font-weight: 400;
		white-space: pre-wrap;
		color: var(--font);
	}

	.docs :global(table *) {
		color: unset;
	}
	.docs :global(a) {
		text-decoration: none;
		font-weight: bold;
	}

	.docs {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		overflow-x: hidden;
		scroll-behavior: smooth;
		background-color: var(--bg);
	}
	#main {
		width: 100%;
		display: grid;
		align-items: start;
	}
	#navWrapper {
		width: 100%;
		background-color: var(--bg);
		position: sticky;
		top: 0;
		overflow: hidden;
		z-index: 3;
	}
	#markdown {
		display: flex;
		flex-direction: column;
		width: 95%;
		overflow-x: hidden;
		gap: 8px;
	}

	.mobileSideBar {
		width: 100%;
		overflow-x: hidden;
		padding-left: 20px;
		padding-bottom: 20px;
	}
	.sideWrapper {
		position: sticky;
	}
	#sidebar {
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	#mobileToc {
		display: none;
		position: sticky;
		width: 100%;
		flex-direction: column;
		overflow-x: hidden;
	}
	#toc {
		position: sticky;
		width: 100%;
		overflow-x: hidden;
		padding-bottom: 20px;
	}
	@media screen and (width < 768px) {
		#main {
			display: flex;
			flex-direction: column;
			padding-inline: 10px;
		}
		#sidebar {
			display: none;
		}
		#toc {
			display: none;
		}
		#mobileToc {
			display: flex;
			background-color: var(--bg);
			padding-bottom: 15px;
			z-index: 4;
		}
		#markdown {
			order: 2;
			width: 100%;
		}
	}
</style>
