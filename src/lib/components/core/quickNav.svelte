<script lang="ts">
	export let pathname: string;
	import { findSectionNeigbors } from '../../extra/utils';
	import Rightarrow from '../icons/rightarrow.svelte';
	import Leftarrow from '../icons/leftarrow.svelte';

	export let sectionsMap: Map<string, string[]>;
	let neigbors = {
		previous: {
			section: '',
			category: ''
		},
		next: {
			section: '',
			category: ''
		}
	};
	$: {
		let location = [...pathname.split('/')];
		neigbors = findSectionNeigbors(sectionsMap, location.at(-1) as string);
		location.shift();
	}
</script>

<div class="quickNav">
	{#if neigbors.previous.section != ''}
		<a class="previous" href="/docs/{neigbors.previous.category}/{neigbors.previous.section}">
			<span class="control"><Leftarrow /></span>
			<span>{neigbors.previous.section}</span>
		</a>
	{/if}
	{#if neigbors.next.section != ''}
		<a class="next" href="/docs/{neigbors.next.category}/{neigbors.next.section}">
			<span>{neigbors.next.section}</span>
			<span class="control">
				<Rightarrow />
			</span>
		</a>
	{/if}
</div>

<style>
	.quickNav {
		display: grid;
		grid-template-columns: 1fr auto;
		width: 100%;
		border-bottom: 2px solid var(--primary400);
		padding-inline: 1%;
		margin-top: 5rem;
		margin-bottom: 14rem;
		padding-bottom: 30px;
		align-items: center;
	}
	.next,
	.previous {
		width: 100%;
		display: flex;
		align-items: center;
		--main: var(--primary400);
		--icon: var(--primary400);
	}
	.next:hover,
	.previous:hover {
		--main: var(--primary800);
		--icon: var(--primary800);
	}
	.next {
		justify-content: flex-end;
	}
	.previous {
		justify-content: flex-start;
	}
	.next span,
	.previous span {
		font-size: var(--h4);
		font-weight: bold;
		color: var(--main);
	}
	.control {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
