<script lang="ts">
	import { getContext } from 'svelte';
	import { LineNumbers, HighlightAuto } from 'svelte-highlight';
	import { theme } from '../../extra/themeStore';
	import { copyToKeyboard } from '../../extra/utils';
	export let lang: string;
	export let text: string;
	const lightTheme = getContext('lightCodeTheme');
	const darkTheme = getContext('darkCodeTheme');
	let copyStatement: boolean = false;
	async function copyCode(e: MouseEvent) {
		copyToKeyboard(text, 800, (newState) => {
			copyStatement = newState;
		});
	}
</script>

<svelte:head>
	{#if $theme}
		{@html darkTheme}
	{:else}
		{@html lightTheme}
	{/if}
</svelte:head>

<div id="codeMdBlock" class={lang}>
	<div id="lang">
		<span>{lang}</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if !copyStatement}
			<i class="fa-solid fa-copy" on:click={copyCode} />
		{:else}
			<i class="fa-solid fa-check-double" />
		{/if}
	</div>
	<HighlightAuto code={text} let:highlighted>
		<LineNumbers {highlighted} hideBorder />
	</HighlightAuto>
</div>

<style>
	#codeMdBlock {
		width: 98%;
		display: flex;
		flex-direction: column;
	}

	#codeMdBlock :global(> :not(#lang)) {
		width: 100%;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		color: initial;
	}
	#codeMdBlock :global(> :not(#lang) code) {
		word-spacing: 1rem;
	}
	#codeMdBlock #lang {
		width: 100%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: var(--primary400);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 10px;
		padding-block: 5px;
	}
	#codeMdBlock #lang span {
		font-weight: bold;
		color: var(--font);
	}
	i {
		color: var(--font);
		font-size: 1.6rem;
		cursor: pointer;
		font-weight: 800;
	}
</style>
