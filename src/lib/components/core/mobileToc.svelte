<script lang="ts">
	import { onMount } from 'svelte';
	import { headerOnView, scrollToHeader } from '../../extra/utils';
	import Rightarrow from '../icons/rightarrow.svelte';
	import Downarrow from '../icons/downarrow.svelte';
	export let links: {
		name: string;
		degree: number;
	}[];
	export let navBarHeight: number;
	const degreeClasses = ['dg1', 'dg2', 'dg3', 'dg4'];
	let currentHeader = '';
	let appear = false;
	onMount(() => {
		headerOnView((headerText) => {
			currentHeader = headerText;
		}, navBarHeight + 63);
	});
</script>

<button on:click={() => (appear = !appear)}>
	<h4>On this page</h4>
	{#if appear}
		<Downarrow />
	{:else}
		<Rightarrow />
	{/if}
</button>
<div class="links" id={appear ? '' : 'hidden'}>
	{#each links as link}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<a
			class="link"
			id={link.name.toLowerCase() == currentHeader.toLowerCase() ? 'active' : ''}
			on:click={() => {
				scrollToHeader(link.name, navBarHeight + 63);
			}}
		>
			<span class={degreeClasses[link.degree - 1]}>{link.name}</span>
		</a>
	{/each}
</div>

<style>
	button {
		width: fit-content;
		height: 3rem;
		outline: none;
		background-color: var(--primary100);
		border: 2px solid var(--primary400);
		border-radius: 6px;
		padding-inline: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		font-weight: bold;
		font-size: var(--body);
		line-height: var(--lhbody);
		gap: 5px;
	}

	button h4 {
		margin: 0;
		color: var(--font);
	}
	.links {
		background-color: var(--primary100);
		border: 2px solid var(--primary400);
		border-radius: 4px;
		width: 95%;
		margin-top: 10px;
		padding-block: 10px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
	}
	.link {
		border: none;
	}
	.link:hover {
		background-color: rgba(134, 129, 129, 0.205);
		border: none;
		filter: contrast(1.4);
	}
	.link span {
		font-weight: bold;
		color: var(--primary400);
	}

	#active {
		background-color: var(--primary400);
	}
	#active span {
		color: var(--font);
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
	#hidden {
		display: none;
	}
</style>
