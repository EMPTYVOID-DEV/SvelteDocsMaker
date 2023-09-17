<script>
	export let href = '';
	export let title = undefined;
	export let text = '';
</script>

<img src={href} {title} alt={text} />

<style>
	img {
		width: 100%;
		aspect-ratio: 2/1;
		object-fit: cover;
		border-radius: 6px;
		border: 1px solid var(--primary400);
		object-position: center;
	}
</style>
