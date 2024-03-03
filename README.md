# Sveltedocsmaker

- [Sveltedocsmaker](#sveltedocsmaker)
  - [Overview](#overview)
  - [Demo](#demo)
  - [Installation](#installation)
  - [Usage](#usage)
  - [UI Layout](#ui-layout)
  - [Sveltedocsmaker Components](#sveltedocsmaker-components)
  - [Utils](#utils)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

Sveltedocsmaker is a package that simplifies the process of building your documentation route using Svelte components. It provides an opinionated user interface with customizable options for colors, font sizes, font families, layout sizes, and custom components.

## Demo

We have created documentation for the [split stack](https://create-split-app.vercel.app/) using the **sveltedocsmaker** template. We recommend taking a look at it to understand how the interface looks.

## Installation

You can install Sveltedocsmaker from the npm registry using one of the following package managers:

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

Sveltedocsmaker components can be used in any Svelte project. However, we recommend using **Sveltekit** because it makes it easy to set up a prerendered route that uses a server load function to read Markdown files from a static folder. Here's an example of how to set it up in **Sveltekit**:

### Static Folder Structure

Your static folder should contain a 'docs' folder, which will hold category folders, each containing section markdown files. Let's take a look at this example:

```plaintext
project-root/
|-- static/
|   |-- docs/
|   |   |-- usage/
|   |   |   |-- sveltekit.md
|   |   |   |-- typescript.md
|   |   |-- deployment/
|   |   |   |-- vercel.md
|   |   |   |-- render.md
```

#### Remarks

- The naming of files matters there is letters that get emitted by the browser for example **/docs/usage/what-next?** the read function will get **usage** and **what-next**.

- The `readMd` function will look for files at this path: `/static/docs/${category}/${section}.md`. Changing this structure will prevent the function from locating the file.

### Documentation Route

You need to have a route that ends with these dynamic parameters: `category` and `section`. It should contain a '+page.svelte' and '+page.server.ts/js'. Here's an example:

```plaintext
project-root/
|-- src/
|   |-- routes/
|   |   |-- docs/
|   |   |   |-- [category]/
|   |   |   |   |-- [section]/
|   |   |   |   |   |-- +page.server.ts
|   |   |   |   |   |-- +page.svelte
```

#### `+page.server.ts`

This file uses the `readMd` function to read the appropriate Markdown file and set `prerender` to true. It should look like the following:

```ts
import { readMd } from 'sveltedocsmaker/utils';
import { error, type Load } from '@sveltejs/kit';

export const prerender = true;

export const load: Load = async ({ params }) => {
	const [data, err] = await readMd(params.section, params.category);

	if (err) {
		console.log(err);
		throw error(404, 'does not exist');
	}

	return data;
};
```

#### `+page.svelte`

This file needs to use the `Main` component and send the loaded data as props to that component along with the current pathname and `sectionMap`, which is a map that mirrors the 'docs' folder.

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

	const sectionsMap = new Map([['usage', ['sveltekit', 'typescript']]]);
</script>

<main {sectionsMap} {data} pathname="{$page.url.pathname}" />
```

## UI Layout

Here is a description of the UI structure:

1. **Navbar:**

- Customizable height, defaulting to 100px.

- Positioned at the top of the page.

- May contain a logo, navigation links, theme toggle, and social links.

- Fixed at the top of the viewport (`position: sticky`) to remain visible as the user scrolls down the page.

- Occupies the entire width of the screen.

2. Main:

- Positioned below the navbar.

- Utilizes a grid layout with template columns: 24% 54% 20%.

- Gap of 10px.

- Left padding of 1%.

3. **Section Menu (24% width, Sticky, Scrollable):**

- Positioned to the left of the main content area.

- Contains a menu of sections organized within categories.

- Stays in place as the user scrolls down the page (sticky), with its own scrollable area for content if the list of sections is long.

- On mobile, it can be toggled on and off using a burger icon.

4. **Markdown Content (54% width, Scrollable):**

- Positioned in the center of the main content area.

- Represents the primary content of the page, displaying the current page's Markdown text.

- Occupies 54% of the total width of the main content area.

- Scrollable, allowing users to navigate through lengthy content by scrolling the page.

5. **Table of Contents (20% width, Sticky):**

- Positioned to the right of the main content area.

- Contains a table of contents or navigation links that provide quick access to different headers within the current section's content.

- Occupies 20% of the total width of the main content area.

- Sticky, so it remains visible as the user scrolls down the page, facilitating navigation within the content.

### Note

On mobile devices, the display will switch from a grid layout to a flex-column layout. The navbar burger icon will toggle between the current section's content and the sections menu, while the table of contents (TOC) will remain sticky under the navbar.

## Sveltedocsmaker Components

### `Main.svelte`

This is the core component of the package, providing several props to customize its functionality. Let's take a look at them:

#### `data` (required)

This prop represents the content of the currently visited section. It includes the Markdown text and its table of contents.

```ts
type Data = {
	md: string;
	toc: {
		degree: number;
		name: string;
	}[];
};

const data: Data = {
	md: '#

 Introduction',
	toc: [{ degree: 1, name: 'Introduction' }]
};
```

#### `sectionMap` (required)

As mentioned before, this prop mirrors the 'docs' folder and is a map with category names as keys and section names as values.

```ts
const sectionMap: Map<string, string[]> = new Map([['usage', ['sveltekit', 'typescript']]]);
```

#### `pathname` (required)

This prop represents the pathname of the currently visited section.

```ts
const pathname = '/docs/usage/typescript';
```

#### `font props` (optional)

This collection of props allows you to customize font sizes, families, and margins. Default values are chosen for responsive design.

```ts
// Typography props
export let h1: string = 'clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)';
// ... (similar settings for h2, h3, h4, body)

// Header top and bottom margin props
export let Mth1: string = '1.5rem';
// ... (similar settings for Mbh1, Mth2, Mbh2, Mth3, Mbh3, Mth4, Mbh4)

// Line height props
export let lh1: number = 1.3;
// ... (similar settings for lh2, lh3, lh4, lhbody)

// Font family
export let headingFont: string = `Verdana, sans-serif`;
export let bodyFont: string = `Helvetica, sans-serif`;
```

#### `color props` (optional)

Sveltedocsmaker uses three main colors for fonts, backgrounds, and the primary color. The primary color is transformed using the `color-mix` to create three different levels: 800, 400, and 100, by adjusting the opacity. You can also provide dark mode counterparts.

```ts
export let lightBgColor: string = '#dfe2ec';
export let darkBgColor: string = '#152038';
export let lightPrimary: string = '#3366FF';
// ... (similar settings for darkPrimary, darkFontColor, lightFontColor, navBarHeight, darkCodeTheme, lightCodeTheme)
```

#### `gridColumns` (optional)

The main component uses a grid display to organize the UI, and you can adjust the spacing using this prop, which works well with custom components.

```ts
type Layout = {
	sectionsNav: string;
	markdown: string;
	toc: string;
	gap: string;
	paddingLeft: string;
	paddingRight: string;
};

const gridColumns: Layout = {
	sectionsNav: '24%',
	markdown: '54%',
	toc: '20%',
	gap: '10px',
	paddingLeft: '1%',
	paddingRight: '0'
};
```

#### `Navigation bar settings` (optional)

These props allow you to customize the navbar without creating your own.

```ts
export let navlinks: {
	label: string;
	href: string;
}[] = [];

export let logo: ComponentType<SvelteComponent<{ mode: boolean }>> | null = null;

// Whether to include GitHub and Discord and Npm links
export let githubLink = '';
export let discordLink = '';
export let npmLink = '';
// Whether to use dark/light mode or just a singular mode
export let doubleMode = true;
```

#### `custom components`

You can pass custom Svelte components to handle specific parts of the UI.

##### `mdHandlers`

This prop allows you to add your custom components to handle Markdown parts like headers, links, images, code blocks, and more.

```ts
export let mdHandlers: {
	image?: ComponentType<SvelteComponent<{ href: string; text: string }>>;
	link?: ComponentType<SvelteComponent<{ href: string }>>;
	list?: ComponentType<SvelteComponent<{ ordered: boolean; start: number }>>;
	blockquote?: ComponentType<SvelteComponent>;
	code?: ComponentType<SvelteComponent<{ text: string; lang: string }>>;
	codespan?: ComponentType<SvelteComponent<{ raw: string }>>;
	heading?: ComponentType<SvelteComponent<{ text: string; depth: number }>>;
	table?: ComponentType<SvelteComponent>;
} = {};
```

##### `CustomLayout parts`

Each of your custom layout components is wrapped with a div that specifies width, height, position, overflow, and sometimes padding.

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
	SvelteComponent<{
		sectionsMap: Map<string, string[]>;
		pathname: string;
	}>
> = null;

export let CustomLocation: null | ComponentType<SvelteComponent<{ pathname: string }>> = null;

export let CustomQuickNav: null | ComponentType<
	SvelteComponent<{
		sectionsMap: Map<string, string[]>;
		pathname: string;
	}>
> = null;

export let CustomNavBar: null | ComponentType<
	SvelteComponent<{
		sectionMenuAppear: boolean;
		pathname: string;
	}>
> = null;
```

### `Location.svelte`

- **Purpose:** The `Location` component is responsible for displaying the current location within the documentation. It takes a `pathname` prop, splits it into segments, removes URL encoding, and presents the segments as a flexbox-based breadcrumb trail on top of the Markdown content component.
- **Functionality:**
  - Receives a `pathname` prop, which represents the current location within the documentation.
  - Splits the `pathname` into segments and removes URL encoding from each segment using the `removeUrlEncoding` function.
  - Renders a breadcrumb trail using flexbox, where each segment is separated by a chevron icon.
  - Provides users with a clear visual indicator of their current location within the documentation hierarchy.

### `QuickNav.svelte`

- **Purpose:** The `Quick Navigation` component is positioned at the bottom of the Markdown content and provides users with the option to navigate to the previous or next section within the documentation.
- **Functionality:**
  - Receives a `pathname` prop, which represents the current location within the documentation.
  - Utilizes the `sectionsMap` prop to determine the previous and next sections relative to the current section.
  - Renders navigation buttons or links that allow users to easily move between sections.
  - Relies on the `findSectionNeighbors` utility function from the `utils` module to identify the previous and next sections based on the current section.

### `Toc.svelte`

- **Purpose:** The `Table of Contents` component is responsible for generating and rendering a dynamic list of headers or sections found within the current page's Markdown content. It enables users to navigate to specific sections, highlights the header corresponding to the current section, and provides smooth scrolling to selected headers.
- **Functionality:**
  - Utilizes the Svelte `onMount` lifecycle function to initialize header tracking when the component is mounted.
  - Monitors scroll events using `headerOnView` function to identify the currently viewed header and updates the `currentHeader` variable accordingly.
  - Renders a list of table

of contents entries based on the provided `links` prop, where each entry includes the header's name and degree (heading level).

- Applies specific CSS classes (`dg1`, `dg2`, `dg3`, `dg4`) that add margin-left based on their heading levels.
- Facilitates smooth scrolling to the selected header when a user clicks on a table of contents entry using `scrollToHeader` function.

#### Note

- It only shows on desktop view (basically above 768px); on mobile, we use `mobileToc`, which, unfortunately, for now, can't be switched with a custom one.

### `sectionMenu.svelte`

- **Purpose:** The Section Menu component is responsible for displaying a navigation menu on the left side of the documentation page. It organizes and presents categories and sections for users to navigate through the documentation.
- **Functionality:**
  - On larger screens, it is displayed as a sidebar and provides a categorized view of sections.
  - On mobile devices, it may be toggled on and off using a button or icon.
  - Utilizes the `sectionsMap` prop to organize and display categories and sections within the menu.
  - Allows users to navigate to specific sections in the documentation.
  - Highlights the current section based on the `pathname` prop using the `removeUrlEncoding` utility function.
  - Calls `changeMobileStatus` when it crosses the >= 768px threshold to toggle off the sectionMenu using `closeSectionMenu` function.

### `Navbar.svelte`

- **Purpose:** This shows your logo , internal links ,external links like github and the theme  
   toggler.
- **Functionality:**.
  - Calls `changeMobileStatus`to toggle off the sectionMenu in mobile when clicking to hamburger
    menu.
  - In desk it shows the logo , internal links, external links and the theme toggler.
  - In mobile the internal and external links will be omited duo to lack of space.

## Utils

### `changeMode(ligthMode: boolean)`

This function change the theme of the site by passing **true** for light and **false** for dark.

### `changeMobileStatus(appear: boolean)`

This function show and hide the mobile menu.

### `readMd(section: string, category: string)`

This asynchronous function reads a Markdown file associated with a specific section and category. It returns a promise that resolves to an array containing two elements:

1. `{ md: string; toc: { degree: number; name: string }[] } | null`: An object with the Markdown content (`md`) and the table of contents (`toc`). If the file is successfully read, this object will contain the Markdown content and its corresponding table of contents. Otherwise, it will be `null`.

2. `ReadFileError | null`: An error object (`ReadFileError`) if there was an issue reading the file. If successful, this will be `null`.

### `generateTableOfContents(mdText: string)`

This function generates a table of contents from the provided Markdown text. It takes the Markdown text as input and returns an array of objects, where each object represents a table of contents entry with the following properties:

- `degree`: The heading level of the entry.

- `name`: The name or text of the heading.

### `findSectionNeighbors(sectionsMap: Map<string, string[]>, sectionName: string)`

Given a `sectionsMap` (a map that associates section names with categories) and a `sectionName`, this function finds the previous and next sections within the map based on the current section. It returns an object with two properties:

- `previous`: An object representing the previous section, containing `section` (the section name) and `category` (the associated category).

- `next`: An object representing the next section, containing `section` (the section name) and `category` (the associated category).

### `scrollToHeader(headerId: string, topSectionThreshold: number)`

This function scrolls the document to a specific header element based on its `headerId`. It calculates the target position based on the provided `topSectionThreshold` and smoothly scrolls to the header.

### `headerOnView(callback: (headerText: string) => void, topSectionThreshold: number)`

This utility function is used to monitor which header is currently in view while scrolling through the Markdown content. It invokes the provided `callback` function with the text of the header when it enters the viewport.

#### Note

The `topSectionThreshold` represent the height of the top sticky section (desk `navbar`, mobile `navbar && mobileToc`) and we want the header to be visible below it.

### `closeSectionMenu(callback: () => void)`

This function is used to toggle off the section menu when the screen width exceeds a 768px threshold. It emits an event that triggers the provided `callback` when the section menu should be hidden.

### `copyToKeyboard(text: string, timeout: number, cb: (state: boolean) => void)`

This utility function is used to copy text to the user's clipboard when a button or element is clicked. It takes the following parameters:

- `text`: The text to be copied to the clipboard.

- `timeout`: The duration (in milliseconds) for which the "Copy" state should be displayed to the user.

- `cb`: A callback function that receives a boolean `state` as its argument, indicating whether the text was successfully copied (`true`) or not (`false`).

### `removeUrlEncoding(encodedString: string)`

This function removes URL encoding from a given encoded string and returns the decoded string. It is used to extract the section name from the URL path and make it human-readable.

## Contributing

Contributions to the sveltedocsmaker are welcome! Feel free to submit pull requests for new features, bug fixes, or improvements. for changes on master branch create a [changeset](https://github.com/changesets/changesets) if you want the the pull request to create new version.

## License

Sveltedocsmaker is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).
