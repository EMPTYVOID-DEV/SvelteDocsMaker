<script>
	export let href = '';
	export let title = undefined;
</script>

<a id="anchor" {href} {title} target="_blank">
	<span><slot /></span>
	<i class="fa-solid fa-arrow-up-right-from-square"></i>
</a>

<style>
	#anchor {
		cursor: pointer;
		opacity: 1;
		margin-inline: 2px;
	}
	#anchor:hover {
		opacity: 1;
		filter: contrast(3);
	}
	span {
		color: var(--primary800);
	}
	i {
		color: var(--primary800);
		font-size: small;
	}
</style>
