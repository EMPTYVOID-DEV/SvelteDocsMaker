<table>
	<slot><!-- optional fallback --></slot>
</table>

<style>
	table {
		border-radius: 8px;
		width: 95%;
	}

	table :global(th),
	table :global(td) {
		border: none;
		color: var(--font);
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: 400;
		line-height: var(--lhbody);
		white-space: normal;
		padding-block: 4px;
		vertical-align: middle;
		border-radius: 6px;
	}

	table :global(td) {
		background-color: var(--primary100);
		border: 2px solid var(--primary400);
		text-align: start;
		padding-left: 8px;
	}

	table :global(th) {
		font-weight: bold;
		background-color: var(--primary800);
	}
	@media screen and (width < 768px) {
		table :global(th),
		table :global(td) {
			padding-left: 4px;
			padding-block: 2px;
		}
	}
</style>
