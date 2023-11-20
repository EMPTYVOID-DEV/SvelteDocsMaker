<script lang="ts">
	import { theme, MobileMenuAppear } from '../../extra/themeStore';
	import { createEventDispatcher, type ComponentType, SvelteComponent } from 'svelte';
	export let links: {
		label: string;
		href: string;
	}[];
	export let doubleMode: boolean;
	export let githubLink: string;
	export let discordLink: string;
	export let npmLink: string;
	export let logo: ComponentType<SvelteComponent<{ mode: boolean }>> | null;
	const toggleDispatcher = createEventDispatcher();
</script>

<nav id="navBar">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->

	{#if logo}
		<div class="logo">
			<svelte:component this={logo} mode={$theme} />
		</div>
	{/if}

	<div class="utility">
		<div class="links">
			{#each links as link}
				<a href={link.href} class="link">{link.label}</a>
			{/each}
		</div>
		{#if githubLink != ''}
			<a href={githubLink} target="_blank" id="github">
				<i class="fa-brands fa-github" />
			</a>
		{/if}
		{#if discordLink != ''}
			<a href={discordLink} target="_blank" id="discord">
				<i class="fa-brands fa-discord" />
			</a>
		{/if}
		{#if npmLink != ''}
			<a href={npmLink} target="_blank" id="npm">
				<i class="fa-brands fa-npm" />
			</a>
		{/if}
		{#if doubleMode}
			<div class="toggle">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<i
					class="fa-solid fa-sun"
					on:click={() => {
						theme.set(true);
					}}
					id={$theme ? 'whiteTheme' : ''}
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<i
					class="fa-solid fa-moon"
					on:click={() => {
						theme.set(false);
					}}
					id={$theme ? '' : 'darkTheme'}
				/>
			</div>
		{/if}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class="fa-solid fa-bars toggler"
			id={$MobileMenuAppear ? 'hidden' : ''}
			on:click={() => {
				MobileMenuAppear.set(true);
			}}
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class="fa-solid fa-xmark toggler"
			id={$MobileMenuAppear ? '' : 'hidden'}
			on:click={() => {
				MobileMenuAppear.set(false);
			}}
		/>
	</div>
</nav>

<style>
	nav {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		padding-inline: 15px;
	}

	i {
		cursor: pointer;
	}
	.logo {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
	}
	.utility {
		display: flex;
		align-items: center;
		gap: 25px;
		justify-self: flex-end;
	}
	.links {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.links .link {
		font-weight: bold;
	}
	.links .link:hover {
		color: var(--primary800);
	}

	#github {
		font-size: 2.1rem;
		color: var(--font);
	}
	#discord {
		font-size: 1.8rem;
		color: var(--font);
	}
	#npm {
		font-size: 2.1rem;
		color: var(--font);
	}
	.toggle {
		display: flex;
		align-items: center;
		gap: 20px;
		background-color: var(--primary100);
		filter: contrast(3);
		padding-inline: 16px;
		padding-block: 8px;
		border-radius: 24px;
	}
	.toggle i {
		font-size: 1.6rem;
		color: var(--font);
	}
	#whiteTheme,
	#darkTheme {
		color: var(--primary800);
	}
	.toggler {
		display: none;
		font-size: 1.8rem;
		margin-left: 10px;
	}
	#hidden {
		display: none;
	}
	@media screen and (width < 768px) {
		.utility {
			gap: 15px;
		}
		.toggler {
			display: inline-block;
		}
		.links,
		#github,
		#npm,
		#discord {
			display: none;
		}
	}
</style>
