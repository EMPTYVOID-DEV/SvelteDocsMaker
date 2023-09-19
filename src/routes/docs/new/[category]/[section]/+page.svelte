<script lang="ts">
	import KitBook from '$lib/components/core/main.svelte';
	import { page } from '$app/stores';
	$: data = $page.data as {
		md: string;
		toc: {
			degree: number;
			name: string;
		}[];
	};
</script>

<KitBook
	githubLink="https://discord.gg/wM7yTebn"
	sectionsMap={new Map([['Svelte Docs', ['Introduction']]])}
	{data}
	pathname={$page.url.pathname}
/>
