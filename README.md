# Sveltedocsmaker

## Overview

Sveltedocsmaker is package that simplifies building your documenation route using svelte components.It has opinionated user interface with the ability to customize color,font sizes,font family,layout sizes and custom components.

## Demo

we built the documentation for the [split stack](https://create-split-app.vercel.app/) using **sveltedocsmaker** template , we suggest to take a look at it to understand how the interface looks.

## Installation

You can install sveltedocsmaker from the npm registry using one of the following package managers:

### npm

```bash
npm install sveltedocsmaker@latest
```

### yarn

```bash
yarn add sveltedocsmaker@latest
```

### pnpm

```bash
pnpm add sveltedocsmaker@latest
```

## Usage

Sveltedocsmaker components can be used in any svelte project but we recommend **Sveltekit** because you can easily setup a prerendered route that uses server load function to read markdown from static folder, here is a showcase to how to set it up in **Sveltekit**:

### static folder structure

Your static folder need to contain a docs folder which will hold category folders each one contains section markdown files. Let take look at this example:

```plaintext
project-root/
|-- static/
|   |-- docs/
|       |--usage
|          |--sveltekit.md
|          |--typescript.md
|       |--deployment
|          |--vercel.md
|          |--render.md
```

#### Remarks

- The naming of files does not matter as long as the operating system is fine with it.
- The [[#readMd]] function will look to this path `/static/docs/${category}/${section}.md` , changing the structure will cause this function to not locate the file.

### Documentation route

You need to have a route that ends with these dynamic parameters `category` and `section`. It need to contain a +page.svelte and +page.server.ts/js , this is an example :

```plaintext
project-root/
|-- src/
|   |-- routes/
|       |--docs
|          |--[category]
|             |--[section]
|                |--+page.server.ts
|                |--+page.svelte
```

#### `+page.server.ts`

This file uses [[#readMd]] function to read the appropriate md file and set prerender to true , it should look like the following.

```ts
import { readMd } from 'sveltedocsmaker/utils';
import { error, type Load } from '@sveltejs/kit';

export const prerender = true;

export const load: Load = async ({ params }) => {
	const [data, err] = await readMd(params.section, params.category);
	if (err) {
		console.log(err);
		throw error(404, 'doesnt exist');
	}
	return data;
};
```

#### `+page.svelte`

This file need to use the [[#Main]] component and send the load data as props to that component along side the current pathname and sectionMap which is a map that mirrors the docs folder.

```html
<script lang="ts">
	import { Main } from 'sveltedocsmaker';
	import { page } from '$app/stores';
	$: data = $page.data as {
		md: string;
		toc: {
			degree: number;
			name: string;
		}[];
	};
	const sectionMap = new Map([['usage', ['sveltekit', 'typescript']]]);
</script>

<main {sectionsMap} {data} pathname="{$page.url.pathname}" />
```

## UI layout

Here is a description for the UI structure:

1. **Navbar :**

   - customizable height default to 100px.
   - Located at the top of the page.
   - Possibly contains logo , navigation links, theme toggle, social links.
   - Fixed at the top of the viewport (`position: sticky`) so that it remains visible as the user scrolls down the page.
   - take the whole with of the screen

2. Main :

   - positioned under the navbar.
   - display grid with template colums 24% 54% 20% .
   - gap 10px.
   - padding left 1%.

3. **Section Menu (24% width, Sticky, Own Scroll):**

   - Positioned to the left of the main content area.
   - Contains a menu of sections organized within categories.
   - Sticky, meaning it stays in place as the user scrolls down the page, but it has its scrollable area for content if the list of sections is long.
   - In mobile it will get toggled off and on by a burger icon.

4. **Markdown Content (54% width, Scrollable):**

   - Positioned in the center of the main content area.
   - Represents the primary content of the page, displaying current page md text.
   - Takes up 54% of the total width of the main content area.
   - Scrollable, allowing users to navigate through lengthy content using the page scroll.

5. **Table of Contents (20% width, Sticky):**
   - Positioned to the right of the main content area.
   - Contains a table of contents or navigation links that provide quick access to different headers of the current section content.
   - Takes up 20% of the total width of the main content area.
   - Sticky, so it remains visible as the user scrolls down the page, aiding navigation within the content.

### Remark

In mobile the display will change from grid to flex-column and the navbar burger icon will toggle between the current section content and sections menu while toc is position stick under the navbar.

## sveltedocsmaker components

### `Main.svelte`

This is the core of the package it provides couple props to customize its functionality , let take look at them :

#### `data:required`

This prop represent the content of the current visited section it contains the md text and its table of content.

```ts
type Data={
  md:string,
  toc:{degree:number,name:string}[]
}
const data:Data={
  md:'# introduction',
  toc:[{'introduction',degree:1}]
}
```

#### `sectionMap:required`

As mentioned before this prop mirrors the docs folder its map with category names as keys and sections names as values.

```ts
const sectionMap: Map<string, string[]> = new Map([['usage', ['sveltekit', 'typescript']]]);
```

#### `pathname:required`

This prop is the pathname of current visited section

```ts
const pathname = '/docs/usage/typescript';
```

#### `font props:optional`

This is a collection of props that customize font sizes , family ,margins , The default values are well chosen to fit responsive design.

```ts
// Typography props
export let h1: string = 'clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)';
export let h2: string = 'clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem)';
export let h3: string = 'clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem)';
export let h4: string = 'clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)';
export let body: string = 'clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem)';

// header top and bottom Margin props
export let Mth1: string = '1.5rem';
export let Mbh1: string = '1.25rem';
export let Mth2: string = '1.25rem';
export let Mbh2: string = '1rem';
export let Mth3: string = '1rem';
export let Mbh3: string = '0.5rem';
export let Mth4: string = '0.75rem';
export let Mbh4: string = '0.25rem';

// Line height props
export let lh1: number = 1.3;
export let lh2: number = 1.35;
export let lh3: number = 1.4;
export let lh4: number = 1.5;
export let lhbody: number = 1.6;

//font family
export let headingFont: string = `Verdana, sans-serif`;
export let bodyFont: string = `Helvetica, sans-serif`;
```

#### `color props:optional`

Sveltedocsmaker uses three main colors for font, background, primary. The primary will get transformed using [[#getColorLevels]] function to three different levels 800,400,100 by lowering the opactity. Also you may add dark counter parts in case you want to use dark mode.

```ts
export let lightBgColor: string = '#dfe2ec';
export let darkBgColor: string = '#152038';
export let lightPrimary: string = '#3366FF';
export let darkPrimary: string = '#9f7cdc';
export let darkFontColor: string = '#140f0e';
export let lightFontColor: string = '#f0e8e8';
export let navBarHeight: number = 100;
export let darkCodeTheme: string = githubDark;
export let lightCodeTheme: string = github;
```

#### `gridColumns:optional`

The main component uses grid display to organize the UI and you can change the spacing that been used with this prop that work well with [[#custom components]].

```ts
type layout = {
	sectionsNav: string;
	markdown: string;
	toc: string;
	gap: string;
	paddingLeft: string;
	paddingRight: string;
};
const gridColumns: layout = {
	sectionsNav: '24%',
	markdown: '54%',
	toc: '20%',
	gap: '10px',
	paddingLeft: '1%',
	paddingRight: '0'
};
```

#### `Navigation bar settings :optional`

These are couple props to customize the navbar without creating your own.

```ts
export let navlinks: {
	label: string;
	href: string;
}[] = [];
export let navlogo: {
	darkIcon: string;
	lightIcon: string;
} = {
	darkIcon: '',
	lightIcon: ''
};
// whether to include github and discord links
export let githubLink = '';
export let discordLink = '';
// whether to use dark/light mode or just sigular mode
export let doubleMode = true;
```

#### `custom components`

You can pass custom svelte component to handle certain parts of the UI.

##### `mdHandlers`

This prop allows you to add your custom components to handle markdown parts like header, link
, image, code block...

```ts
export let mdHandlers: {
	image?: ComponentType<SvelteComponent<{ href: string; text: string }>>;
	link?: ComponentType<SvelteComponent<{ href: string }>>;
	list?: ComponentType<SvelteComponent<{ ordered: boolean; start: number }>>;
	blockquote?: ComponentType<SvelteComponent>;
	code?: ComponentType<SvelteComponent<{ text: string; lang: string }>>;
	codespan?: ComponentType<SvelteComponent<{ raw: string }>>;
	heading?: ComponentType<SvelteComponent<{ text: string; depth: number }>>;
} = {};
```

##### `CustomLayout parts`

Each of Your custom layout components  are wrapped with div that specifies width, height , position, overflow and sometimes padding. Your custom components will get props and also you have access to certain utility functions.

```ts
   export let CustomToc: null | ComponentType<
        SvelteComponent<{
            links: {
                name: string;
                degree: number;
            }[];
            navBarHeight: number;
        }>
    > = null;
    export let CustomSectionsMenu: null | ComponentType<
        SvelteComponent<{ sectionsMap: Map<string, string[]>; pathname: string }>
    > = null;
    export let CustomLocation: null | ComponentType<SvelteComponent<{ pathname: string }>> = null;
    export let CustomQuickNav: null | ComponentType<
        SvelteComponent<{ sectionsMap: Map<string, string[]>; pathname: string }>
    > = null;
    export let CustomNavBar: null | ComponentType<
        SvelteComponent<{
            sectionMenuAppear: boolean;
            pathname: string;
        }>
    > = null;
```

- `customToc` this component show the table of content links .
- `customSectionMenu` this component shows sections navigation .
- `customLocation` this shows the current location  for ex: docs ->usage->sveltekit.
- `customQuickNav` this handles the fast navigation to the previous/next sections of the current one.
- `customNavBar`  this one is obvious.

###### Remark

explaining each component internals will take too many paragraphs feel free to check repo code. 
