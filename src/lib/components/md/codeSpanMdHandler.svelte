<script>
	export let raw;
</script>

<code>{raw.replace(/`/g, '')}</code>

<style>
	code {
		padding-inline: 2px;
		padding-block: 2px;
		border: 2px solid var(--primary400);
		background-color: var(--primary100);
		border-radius: 4px;
		font-size: inherit;
		font-weight: inherit;
		line-height: inherit;
	}
</style>
