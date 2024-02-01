<script>
	import { theme, MobileMenuAppear } from '../../extra/themeStore';
	import { getContext } from 'svelte';
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
				<i class="fa-brands fa-github" />
			</a>
		{/if}
		{#if settings.discordLink != ''}
			<a href={settings.discordLink} target="_blank" class="discord">
				<i class="fa-brands fa-discord" />
			</a>
		{/if}
		{#if settings.npmLink != ''}
			<a href={settings.npmLink} target="_blank" class="npm">
				<i class="fa-brands fa-npm" />
			</a>
		{/if}
		{#if settings.doubleMode}
			<div class="toggle">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<i
					class="fa-solid fa-sun"
					class:whiteTheme={$theme}
					on:click={() => {
						theme.set(true);
					}}
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<i
					class="fa-solid fa-moon"
					class:darkTheme={$theme}
					on:click={() => {
						theme.set(false);
					}}
				/>
			</div>
		{/if}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class="fa-solid fa-bars control"
			class:hidden={$MobileMenuAppear}
			on:click={() => {
				MobileMenuAppear.set(true);
			}}
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class="fa-solid fa-xmark control"
			class:hidden={!$MobileMenuAppear}
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
		color: var(--font);
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
		height: 2rem;
	}
	.link:hover {
		border-bottom: 3px solid var(--primary800);
	}
	.links .link:hover {
		color: var(--primary800);
	}

	.github {
		font-size: 2.1rem;
		color: var(--font);
	}
	.discord {
		font-size: 1.8rem;
		color: var(--font);
	}
	.npm {
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
	.whiteTheme,
	.darkTheme {
		color: var(--primary800);
	}
	.control {
		display: none;
		font-size: 1.8rem;
		margin-left: 10px;
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
