<script lang="ts">
	import { removeUrlEncoding } from '../../extra/utils';
	import Home from '../icons/home.svelte';
	import Rightarrow from '../icons/rightarrow.svelte';
	export let pathname: string;
	let location: string[] = [];
	$: {
		location = [...pathname.split('/')];
		location.shift();
	}
</script>

<div class="location">
	<Home />
	{#each location as param}
		<Rightarrow />
		<span>{removeUrlEncoding(param)}</span>
	{/each}
</div>

<style>
	.location {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 2px;
	}
	.location span {
		padding-inline: 3px;
		padding-block: 3px;
		background-color: var(--primary100);
		border-radius: 6px;
		color: var(--font);
		font-size: var(--small);
		border: 2px solid var(--primary400);
	}
</style>
