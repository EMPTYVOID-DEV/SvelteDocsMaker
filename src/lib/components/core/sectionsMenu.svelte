<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { closeSectionMenu, removeUrlEncoding } from '../../extra/utils';
	import { MobileMenuAppear } from '../../extra/stores';
	export let pathname: string;
	export let sectionsMap: Map<string, string[]>;
	onMount(() => {
		closeSectionMenu(() => {
			MobileMenuAppear.set(false);
		});
	});
</script>

<div id="sectionsNav">
	{#each sectionsMap.keys() as category}
		<div class="category">
			<h3>{category}</h3>
			{#each sectionsMap.get(category) as section}
				<a
					class="section"
					id={removeUrlEncoding(pathname).includes(section) ? 'current' : ''}
					on:click={() => {
						MobileMenuAppear.set(false);
					}}
					href={`/docs/${category}/${section}`}
				>
					<span>{section}</span>
				</a>
			{/each}
		</div>
	{/each}
</div>

<style>
	#sectionsNav {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 90%;
	}
	.category {
		display: flex;
		flex-direction: column;
	}
	.category h3 {
		margin: 0;
		margin-block: 3px;
		color: var(--font);
	}
	#current {
		background-color: var(--primary100);
		border-left: 3px solid var(--primary800);
		filter: contrast(5);
	}
	#current span {
		color: var(--primary800);
	}
	#current:hover span {
		color: var(--font);
	}
	.section {
		border-left: 3px solid var(--primary400);
		padding-left: 10px;
		margin-left: 5px;
		padding-block: 5px;
	}
	.section span {
		font-weight: 600;
		font-size: var(--h4);
	}
	.section:hover {
		border-left: 3px solid var(--primary800);
		filter: contrast(1.5);
		background-color: var(--primary100);
	}
	.section:hover span {
		text-decoration: underline;
		color: var(--primary800);
	}
	a {
		color: var(--primary400);
		font-size: var(--h4);
		font-weight: bold;
	}
</style>
