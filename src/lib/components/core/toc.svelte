<script lang="ts">
	import { onMount } from 'svelte';
	import { headerOnView, scrollToHeader } from '$lib/extra/utils';
	export let links: {
		name: string;
		degree: number;
	}[];
	export let navBarHeight: number;
	const degreeClasses = ['dg1', 'dg2', 'dg3', 'dg4'];
	let currentHeader = '';
	onMount(() => {
		headerOnView((headerText) => {
			currentHeader = headerText;
		}, navBarHeight);
	});
</script>

<div class="tocContainer">
	<h4>On this page</h4>
	<div class="links">
		{#each links as link}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<a
				class="link"
				id={link.name.toLowerCase() == currentHeader.toLowerCase() ? 'active' : ''}
				on:click={() => {
					scrollToHeader(link.name, navBarHeight);
				}}
			>
				<span class={degreeClasses[link.degree - 1]}>{link.name}</span>
			</a>
		{/each}
	</div>
</div>

<style>
	.tocContainer {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.links {
		display: flex;
		flex-direction: column;
	}
	.link {
		border-left: 3px solid var(--primary400);
		cursor: pointer;
	}
	.link:hover {
		border-left: 3px solid var(--primary800);
		filter: contrast(1.5);
	}
	#active {
		border-left: 3px solid var(--primary800);
		background-color: var(--primary100);
	}
	#active span {
		color: var(--primary800);
	}
	#active:hover span {
		color: var(--font);
	}
	span {
		font-weight: 600;
		text-align: start;
		color: var(--primary400);
		display: inline-block;
	}
	span:hover {
		text-decoration: underline;
		color: var(--primary800);
	}
	.dg1 {
		margin-left: 8px;
	}
	.dg2 {
		margin-left: 16px;
	}
	.dg3 {
		margin-left: 24px;
	}
	.dg4 {
		margin-left: 32px;
	}
</style>
