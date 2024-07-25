<script lang="ts">
	import CoreMd from '../md/coreMd.svelte';
	import Toc from './toc.svelte';
	import MobileToc from './mobileToc.svelte';
	import NavBar from './navBar.svelte';
	import Location from './Location.svelte';
	import QuickNav from './quickNav.svelte';
	import { setContext, type ComponentType, SvelteComponent } from 'svelte';
	import { MobileMenuAppear, theme } from '../../extra/stores';
	import SectionsMenu from './sectionsMenu.svelte';
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
		paragraph?: ComponentType<SvelteComponent>;
		image?: ComponentType<SvelteComponent<{ href: string; text: string }>>;
		link?: ComponentType<SvelteComponent<{ href: string }>>;
		list?: ComponentType<SvelteComponent<{ ordered: boolean; start: number }>>;
		blockquote?: ComponentType<SvelteComponent>;
		code?: ComponentType<SvelteComponent<{ text: string; lang: string }>>;
		codespan?: ComponentType<SvelteComponent<{ raw: string }>>;
		heading?: ComponentType<SvelteComponent<{ text: string; depth: number }>>;
		table?: ComponentType<SvelteComponent>;
	} = {};
	export let CustomToc: ComponentType<
		SvelteComponent<{
			links: {
				name: string;
				degree: number;
			}[];
			navBarHeight: number;
		}>
	> = Toc;
	export let CustomSectionsMenu: ComponentType<
		SvelteComponent<{ sectionsMap: Map<string, string[]>; pathname: string }>
	> = SectionsMenu;
	export let CustomLocation: ComponentType<SvelteComponent<{ pathname: string }>> = Location;
	export let CustomQuickNav: ComponentType<
		SvelteComponent<{ sectionsMap: Map<string, string[]>; pathname: string }>
	> = QuickNav;
	export let CustomNavBar: ComponentType<SvelteComponent> = NavBar;

	// colors and themes
	export let lightBgColor: string = '#dfe2ec';
	export let darkBgColor: string = '#152038';
	export let lightPrimary: string = '#3366FF';
	export let darkPrimary: string = '#9f7cdc';
	export let darkFontColor: string = '#f0e8e8';
	export let lightFontColor: string = '#140f0e';
	export let navBarHeight: number = 100;

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
	export let logo: ComponentType<SvelteComponent<{ mode: boolean }>> | null = null;
	export let githubLink = '';
	export let discordLink = '';
	export let npmLink = '';
	export let doubleMode = true;

	setContext('navBarOptions', {
		navlinks,
		logo,
		githubLink,
		discordLink,
		npmLink,
		doubleMode
	});

	$: primaryColor = $theme ? lightPrimary : darkPrimary;
</script>

<main
	id="docs"
	style:--primary800={primaryColor}
	style:--primary400="color-mix(in srgb, {primaryColor} 40%, transparent 60%)"
	style:--primary100="color-mix(in srgb, {primaryColor} 22%, transparent 78%)"
	style:--bg={$theme ? lightBgColor : darkBgColor}
	style:--font={$theme ? lightFontColor : darkFontColor}
	style:--h1={h1}
	style:--h2={h2}
	style:--h3={h3}
	style:--h4={h4}
	style:--body={body}
	style:--Mth1={Mth1}
	style:--Mbh1={Mbh1}
	style:--Mth2={Mth2}
	style:--Mbh2={Mbh2}
	style:--Mth3={Mth3}
	style:--Mbh3={Mbh3}
	style:--Mth4={Mth4}
	style:--Mbh4={Mbh4}
	style:--lh1={lh1}
	style:--lh2={lh2}
	style:--lh3={lh3}
	style:--lh4={lh4}
	style:--lhbody={lhbody}
	style:--headingFont={headingFont}
	style:--bodyFont={bodyFont}
>
	<div class="navWrapper" style="height: {navBarHeight}px;">
		<svelte:component this={CustomNavBar} />
	</div>
	{#if $MobileMenuAppear}
		<div class="mobileSideBar">
			<svelte:component this={CustomSectionsMenu} {pathname} {sectionsMap} />
		</div>
	{:else}
		<div
			class="main"
			style="grid-template-columns:{gridColumns.sectionsNav} {gridColumns.markdown} {gridColumns.toc}; gap:{gridColumns.gap};padding-left:{gridColumns.paddingLeft};padding-right:{gridColumns.paddingRight};"
		>
			<div class="sideWrapper" style="top: {navBarHeight}px;">
				<div class="sidebar" style="max-height: calc(95vh - {navBarHeight}px);">
					<svelte:component this={CustomSectionsMenu} {sectionsMap} {pathname} />
				</div>
			</div>
			<div id="markdown">
				<svelte:component this={CustomLocation} {pathname} />

				{#key data}
					<CoreMd source={data.md} {mdHandlers} />
				{/key}
				<svelte:component this={CustomQuickNav} {pathname} {sectionsMap} />
			</div>
			<div class="mobileToc" style="top: {navBarHeight}px;">
				<MobileToc links={data.toc} {navBarHeight} />
			</div>
			<div class="toc" style="top: {navBarHeight}px;">
				<svelte:component this={CustomToc} links={data.toc} {navBarHeight} />
			</div>
		</div>
	{/if}
</main>

<style>
	:global(:not(dialog)) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	main :global(:where(h1, h2, h3, h4)) {
		font-family: var(--headingFont);
		font-weight: bold;
	}

	main :global(h1) {
		font-size: var(--h1);
	}

	main :global(h2) {
		font-size: var(--h2);
	}
	main :global(h3) {
		font-size: var(--h3);
	}
	main :global(h4) {
		font-size: var(--h4);
	}

	main :global(:where(p, span, a, li, code)) {
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: 400;
	}

	main :global(a) {
		text-decoration: none;
	}

	#markdown :global(h1) {
		line-height: var(--lh1);
		margin-top: var(--Mth1);
		margin-bottom: var(--Mbh1);
	}
	#markdown :global(h2) {
		line-height: var(--lh2);
		margin-top: var(--Mth2);
		margin-bottom: var(--Mbh2);
	}
	#markdown :global(h3) {
		line-height: var(--lh3);
		margin-top: var(--Mth3);
		margin-bottom: var(--Mbh3);
	}

	#markdown :global(h4) {
		line-height: var(--lh4);
		margin-top: var(--Mth4);
		margin-bottom: var(--Mbh4);
	}

	#markdown :global(:where(p, span, a, li, code)) {
		line-height: var(--lhbody);
	}

	#docs {
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
		overflow-x: hidden;
		scroll-behavior: smooth;
		background-color: var(--bg);
	}
	.main {
		width: 100%;
		display: grid;
		align-items: start;
	}
	.navWrapper {
		width: 100%;
		background-color: var(--bg);
		position: sticky;
		top: 0;
		z-index: 99;
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
	.sidebar {
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.mobileToc {
		display: none;
		width: 100%;
		flex-direction: column;
		overflow-x: hidden;
	}
	.toc {
		position: sticky;
		width: 100%;
		overflow-x: hidden;
		padding-bottom: 20px;
	}
	@media screen and (width < 1024px) {
		.main {
			display: flex;
			flex-direction: column;
			padding-inline: 10px;
		}
		.sidebar {
			display: none;
		}
		.toc {
			display: none;
		}
		.mobileToc {
			display: flex;
			background-color: var(--bg);
			padding-bottom: 15px;
		}
		#markdown {
			order: 2;
			width: 98%;
			padding-left: 5px;
		}
	}
</style>
