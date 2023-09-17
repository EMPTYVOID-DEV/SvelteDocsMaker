<script lang="ts">
	import { theme } from '$lib/extra/themeStore';
	import { createEventDispatcher } from 'svelte';
	export let sectionMenuAppear: boolean;
	export let pathname: string;
	export let settings: {
		links: {
			label: string;
			href: string;
		}[];
		logo: {
			darkIcon: string;
			lightIcon: string;
		};
		doubleMode: boolean;
		githubLink: string;
		discordLink: string;
	};
	const toggleDispatcher = createEventDispatcher();
</script>

<nav id="navBar">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->

	<div class="links">
		{#if settings.logo.lightIcon != '' && settings.logo.darkIcon != ''}
			<a href="/" id="logo">
				<img src={$theme ? settings.logo.lightIcon : settings.logo.darkIcon} alt="logo" />
			</a>
		{/if}
		{#each settings.links as link}
			<a
				href={link.href}
				class="link"
				id={link.href.split('/')[1] == pathname.split('/')[1] ? 'active' : ''}>{link.label}</a
			>
		{/each}
	</div>

	<div class="utility">
		{#if settings.githubLink != ''}
			<a href={settings.githubLink} target="_blank" id="github">
				<i class="fa-brands fa-github" />
			</a>
		{/if}
		{#if settings.discordLink != ''}
			<a href={settings.discordLink} target="_blank" id="discord">
				<i class="fa-brands fa-discord" />
			</a>
		{/if}
		{#if settings.doubleMode}
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
			id={sectionMenuAppear ? 'hidden' : ''}
			on:click={() => {
				toggleDispatcher('showMobileMenu');
			}}
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class="fa-solid fa-xmark toggler"
			id={sectionMenuAppear ? '' : 'hidden'}
			on:click={() => {
				toggleDispatcher('hideMobileMenu');
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
		padding-right: 30px;
	}

	.links {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	.links > .link {
		text-transform: capitalize;
		font-size: var(--h4);
		font-weight: bold;
	}
	#active {
		color: var(--primary800);
	}
	.links > .link:hover {
		text-decoration: underline;
	}
	.links #logo img {
		cursor: pointer;
		width: fit-content;
		max-width: 14rem;
		object-fit: contain;
		object-position: center;
	}
	i {
		cursor: pointer;
	}
	.utility {
		display: flex;
		align-items: center;
		gap: 25px;
		justify-self: flex-end;
	}
	#github {
		font-size: 2.1rem;
		color: var(--font);
	}
	#discord {
		font-size: 1.8rem;
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
		img {
			max-width: 10rem;
		}
		.toggler {
			display: inline-block;
		}
		.links .link {
			display: none;
		}
	}
</style>
