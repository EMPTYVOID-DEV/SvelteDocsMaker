<script lang="ts">
	import { page } from '$app/stores';
	import Main from '$lib/components/core/main.svelte';

	$: data = $page.data as {
		md: string;
		toc: {
			degree: number;
			name: string;
		}[];
	};

	const sectionMap = new Map([
		['Altron', ['Introduction', 'Data structure', 'Getting started', 'What next']],
		['Usage', ['Customization', 'Utils', 'Events', 'Types', 'View mode', 'Notes', 'Props']]
	]);
</script>

<Main
	{data}
	sectionsMap={sectionMap}
	pathname={$page.url.pathname}
	navlinks={[
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'Example',
			href: '/example'
		},
		{
			label: 'Live test',
			href: '/test'
		}
	]}
	githubLink="https://github.com/Shinji13/Altron"
	npmLink="https://www.npmjs.com/package/@altron/altron"
	discordLink="/"
	navBarHeight={100}
	darkPrimary={'#3164ff'}
	darkBgColor={'#000000'}
	darkFontColor={'#ffffff'}
	lightPrimary={'#cc3300'}
	lightBgColor={'#ffffff'}
	lightFontColor={'#000000'}
/>
