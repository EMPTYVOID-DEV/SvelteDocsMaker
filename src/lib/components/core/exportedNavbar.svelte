<script lang="ts">
	import { theme } from '$lib/extra/themeStore';
	import { getColorLevels } from '$lib/extra/utils';
	import { createEventDispatcher } from 'svelte';
	export let mobileToggle: boolean = true;
	export let pathname: string;
	export let links: {
		label: string;
		href: string;
	}[] = [];
	export let doubleTheme: boolean = true;
	export let githubLink: string = '';
	export let discordLink: string = '';
	export let logo: {
		darkIcon: string;
		lightIcon: string;
	} = {
		darkIcon: '',
		lightIcon: ''
	};
	export let lightPrimary: string = '#3366FF';
	export let darkPrimary: string = '#9f7cdc';
	export let darkFontColor: string = '#140f0e';
	export let lightFontColor: string = '#f0e8e8';
	export let bodyFont: string = `Helvetica, sans-serif`;
	export let h4: string = 'clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)';
	let toggleOn = false;
	const toggleDispatcher = createEventDispatcher();
	$: primaryColors = $theme ? getColorLevels(lightPrimary) : getColorLevels(darkPrimary);
</script>

<nav
	id="navBar"
	style="
     --primary800:{primaryColors[0]};
     --primary100:{primaryColors[2]};
     --font:{$theme ? darkFontColor : lightFontColor}; 
     --h4:{h4};
     --bodyFont:{bodyFont};
"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->

	<div class="links">
		{#if logo.lightIcon != '' && logo.darkIcon != ''}
			<a href="/" id="logo">
				<img src={$theme ? logo.lightIcon : logo.darkIcon} alt="logo" />
			</a>
		{/if}
		{#each links as link}
			<a
				href={link.href}
				class="link"
				id={link.href.split('/')[1] == pathname.split('/')[1] ? 'active' : ''}>{link.label}</a
			>
		{/each}
	</div>

	<div class="utility">
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
		{#if doubleTheme}
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
		{#if mobileToggle}
			<i
				class="fa-solid fa-bars toggler"
				id={toggleOn ? 'hidden' : ''}
				on:click={() => {
					toggleOn = true;
					toggleDispatcher('showMobileMenu');
				}}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i
				class="fa-solid fa-xmark toggler"
				id={toggleOn ? '' : 'hidden'}
				on:click={() => {
					toggleOn = false;
					toggleDispatcher('hideMobileMenu');
				}}
			/>
		{/if}
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
		font-family: var(--bodyFont);
		color: var(--font);
		white-space: normal;
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
