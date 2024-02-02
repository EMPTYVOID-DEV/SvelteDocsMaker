<script>
	//@ts-nocheck
	import Copy from '../icons/copy.svelte';
	import Done from '../icons/done.svelte';
	export let text;
	export let lang;
	let copyStatement = false;
	function copyCode() {
		navigator.clipboard.writeText(text);
		copyStatement = true;
		new Promise((res) => setTimeout(res, 800)).then(() => (copyStatement = false));
	}
</script>

<div id="codeMdBlock" class={lang}>
	<div id="lang">
		<span>{lang}</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if !copyStatement}
			<span on:click|stopPropagation={copyCode} class="control"><Copy /></span>
		{:else}
			<span><Done /></span>
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
		background-color: var(--primary100);
		padding-bottom: 10px;
		overflow: hidden;
		color: var(--font);
	}

	#codeMdBlock > code {
		padding-left: 10px;
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
