<script lang="ts">
	import { removeUrlEncoding } from '../../extra/utils';

	export let pathname: string;
	let location: string[] = [];
	$: {
		location = [...pathname.split('/')];
		location.shift();
	}
</script>

<div class="location">
	<i class="fa-solid fa-house" />
	{#each location as param}
		<i class="fa-solid fa-chevron-right" />
		<span>{removeUrlEncoding(param)}</span>
	{/each}
</div>

<style>
	.location {
		display: flex;
		width: 100%;
		gap: 5px;
		align-items: center;
	}
	.location i:not(i:first-child) {
		color: var(--font);
		font-weight: bold;
	}
	.location i:first-child {
		background-color: var(--font);
		color: var(--bg);
		padding: 5px;
		border-radius: 6px;
	}
	.location span {
		padding-inline: 3px;
		padding-block: 1px;
		background-color: var(--primary100);
		border-radius: 6px;
		color: var(--font);
		font-size: var(--small);
		border: 2px solid var(--primary400);
	}
</style>
