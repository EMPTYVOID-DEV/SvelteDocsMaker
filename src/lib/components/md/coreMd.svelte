<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import ImageHandler from './ImageMdHandler.svelte';
	import LinkMdHandler from './LinkMdHandler.svelte';
	import ListMdHandler from './ListMdHandler.svelte';
	import QuoteMdHandler from './QuoteMdHandler.svelte';
	import CodeMdHandler from './CodeMdHandler.svelte';
	import CodeSpanMdHandler from './codeSpanMdHandler.svelte';
	import HeaderMdHandler from './headerMdHandler.svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import TableMdHandler from './tableMdHandler.svelte';
	export let source: string;
	export let mdHandlers: {
		image?: ComponentType<SvelteComponent<{ href: string; text: string }>>;
		link?: ComponentType<SvelteComponent<{ href: string }>>;
		list?: ComponentType<SvelteComponent<{ ordered: boolean; start: number }>>;
		blockquote?: ComponentType<SvelteComponent>;
		code?: ComponentType<SvelteComponent<{ text: string; lang: string }>>;
		codespan?: ComponentType<SvelteComponent<{ raw: string }>>;
		heading?: ComponentType<SvelteComponent<{ text: string; depth: number }>>;
		table?: ComponentType<SvelteComponent>;
	};
</script>

<SvelteMarkdown
	{source}
	renderers={{
		table: mdHandlers.table || TableMdHandler,
		image: mdHandlers.image || ImageHandler,
		link: mdHandlers.link || LinkMdHandler,
		list: mdHandlers.list || ListMdHandler,
		blockquote: mdHandlers.blockquote || QuoteMdHandler,
		code: mdHandlers.code || CodeMdHandler,
		codespan: mdHandlers.codespan || CodeSpanMdHandler,
		heading: mdHandlers.heading || HeaderMdHandler
	}}
/>
