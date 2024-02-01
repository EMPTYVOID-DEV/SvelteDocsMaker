<script lang="ts">
	import { copyToKeyboard } from '../../extra/utils';
	export let lang: string;
	export let text: string;
	let copyStatement: boolean = false;
	async function copyCode(e: MouseEvent) {
		copyToKeyboard(text, 800, (newState) => {
			copyStatement = newState;
		});
	}
</script>

<div id="codeMdBlock" class={lang}>
	<div id="lang">
		<span>{lang}</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if !copyStatement}
			<i class="fa-solid fa-copy control" on:click={copyCode} />
		{:else}
			<i class="fa-solid fa-check-double" />
		{/if}
	</div>
	<code>{text}</code>
</div>

<style>
	#codeMdBlock {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 5px;
		border-radius: 5px;
		background-color: var(--font);
		padding-bottom: 10px;
		overflow: hidden;
	}

	#codeMdBlock > code {
		padding-left: 10px;
		color: var(--bg);
	}

	#codeMdBlock #lang {
		width: 100%;
		background-color: var(--primary800);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 10px;
		padding-block: 5px;
	}

	#codeMdBlock #lang span {
		font-weight: bold;
		text-transform: capitalize;
	}
	.control {
		cursor: pointer;
	}
</style>
