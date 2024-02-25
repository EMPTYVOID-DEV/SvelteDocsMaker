<script>
	//@ts-nocheck
	export let ordered;
	export let start;
</script>

{#if ordered}
	<ol {start}><slot /></ol>
{:else}
	<ul><slot /></ul>
{/if}

<style>
	ul,
	ol {
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: var(--font);
	}
	ul {
		list-style: disc;
	}
	ol {
		list-style: decimal;
	}
</style>
