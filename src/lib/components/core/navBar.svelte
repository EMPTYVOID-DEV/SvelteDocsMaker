<script>
	import { theme, MobileMenuAppear } from '../../extra/themeStore';
	import { getContext } from 'svelte';
	import Discord from '../icons/discord.svelte';
	import Npm from '../icons/npm.svelte';
	import Github from '../icons/github.svelte';
	import Darkmode from '../icons/darkmode.svelte';
	import Lightmode from '../icons/lightmode.svelte';
	import Menu from '../icons/menu.svelte';
	import Close from '../icons/close.svelte';
	const settings = getContext('navBarOptions');
</script>

<nav class="navBar">
	{#if settings.logo}
		<div class="logo">
			<svelte:component this={settings.logo} mode={$theme} />
		</div>
	{/if}

	<div class="utility">
		<div class="links">
			{#each settings.navlinks as link}
				<a href={link.href} class="link">{link.label}</a>
			{/each}
		</div>
		{#if settings.githubLink != ''}
			<a href={settings.githubLink} target="_blank" class="github">
				<Github />
			</a>
		{/if}
		{#if settings.discordLink != ''}
			<a href={settings.discordLink} target="_blank" class="discord">
				<Discord />
			</a>
		{/if}
		{#if settings.npmLink != ''}
			<a href={settings.npmLink} target="_blank" class="npm">
				<Npm />
			</a>
		{/if}
		{#if settings.doubleMode}
			<div class="toggle">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					on:click={() => {
						theme.set(true);
					}}><Lightmode /></span
				>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					on:click={() => {
						theme.set(false);
					}}><Darkmode /></span
				>
			</div>
		{/if}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="control"
			class:hidden={$MobileMenuAppear}
			on:click={() => {
				MobileMenuAppear.set(true);
			}}><Menu /></span
		>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="control"
			class:hidden={!$MobileMenuAppear}
			on:click={() => {
				MobileMenuAppear.set(false);
			}}><Close /></span
		>
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
		color: var(--font);
		font-weight: bold;
		height: 2rem;
	}
	.link:hover {
		border-bottom: 3px solid var(--primary800);
	}
	.links .link:hover {
		color: var(--primary800);
	}

	.toggle {
		display: flex;
		align-items: center;
		gap: 20px;
		background-color: color-mix(in srgb, var(--primary800) 30%, transparent 70%);
		padding-inline: 16px;
		padding-block: 8px;
		border-radius: 24px;
	}
	.toggle span {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.control {
		display: none;
		margin-left: 10px;
		cursor: pointer;
	}
	@media screen and (width < 768px) {
		.control {
			display: inline-block;
		}
		.hidden {
			display: none;
		}
		.utility {
			gap: 15px;
		}
		.links,
		.github,
		.npm,
		.discord {
			display: none;
		}
	}
</style>
