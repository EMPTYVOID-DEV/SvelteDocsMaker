# Easy Documentation with `sveltedocsmaker`

## Overview

The `sveltedocsmaker` documentation component is a Svelte package that simplifies the process of creating documentation routes. This component provides a customizable and responsive documentation layout with various configuration options.

## Installation

You can install `sveltedocsmaker` from the npm registry using one of the following package managers:

### npm

```bash
npm install sveltedocsmaker@latest
```

````

### yarn

```bash
yarn add sveltedocsmaker@latest
```

### pnpm

```bash
pnpm add sveltedocsmaker@latest
```

## Usage

### Main Component

To use the `sveltedocsmaker` documentation component in your project, follow these steps:

1. Import the component into your Svelte application:

```javascript
import { Main } from 'sveltedocsmaker';
```

2. Add the `<Main>` component to your Svelte template where you want to display documentation content:

```html
<main
	{data}
	{sectionsMap}
	{pathname}
	{mdHandlers}
	{CustomToc}
	{CustomSectionsMenu}
	{CustomLocation}
	{CustomQuickNav}
	{CustomNavBar}
	{lightBgColor}
	{darkBgColor}
	{lightPrimary}
	{darkPrimary}
	{darkFontColor}
	{lightFontColor}
	{navBarHeight}
	{darkCodeTheme}
	{lightCodeTheme}
	{h1}
	{h2}
	{h3}
	{h4}
	{body}
	{Mth1}
	{Mbh1}
	{Mth2}
	{Mbh2}
	{Mth3}
	{Mbh3}
	{Mth4}
	{Mbh4}
	{lh1}
	{lh2}
	{lh3}
	{lh4}
	{lhbody}
	{headingFont}
	{bodyFont}
	{gridColumns}
	{navlinks}
	{navlogo}
	{githubLink}
	{discordLink}
	{doubleMode}
/>
```

3. Customize the documentation content by providing the necessary props:

   - `data`: An object containing the markdown content and table of contents.
   - `sectionsMap`: A map that associates section names with categories.
   - `pathname`: The current pathname for routing.
   - `mdHandlers`: Custom components for handling various Markdown elements.
   - `CustomToc`: A custom table of contents component.
   - `CustomSectionsMenu`: A custom sections menu component.
   - `CustomLocation`: A custom location component.
   - `CustomQuickNav`: A custom quick navigation component.
   - `CustomNavBar`: A custom navigation bar component.
   - Other props for colors, themes, typography, layout sizes, and more.

### Example Usage

```html
<script>
	import { Main } from 'sveltedocsmaker';

	let data = {
		md: '## Welcome to My Documentation\nThis is an example documentation page.',
		toc: [{ degree: 2, name: 'Welcome to My Documentation' }]
	};

	let sectionsMap = new Map();
	sectionsMap.set('Category 1', ['Section 1', 'Section 2']);
	sectionsMap.set('Category 2', ['Section 3', 'Section 4']);

	let pathname = '/category-1/section-1';

	// Customize other props as needed
</script>

<main>
	<main {data} {sectionsMap} {pathname} />
</main>
```

### Utils

`sveltedocsmaker` provides a couple of functions that are intended for use with SvelteKit routes and assume that the Markdown files exist under the `static/docs` folder by default. Additionally, the SvelteKit routes should contain `[category]/[section]/` (both `+page.svelte` and `+page.server.ts`). These functions are specifically designed for this structure:

- **Folder Structure**: Your documentation should be organized in folders with category names, and each category folder should contain sections as Markdown files.

- **Naming Convention**: The category folder and its section Markdown files should be named the same as the entries in the `sectionsMap` that you pass to the main component.

Here are the updated utility functions:

#### `readMd(section: string, category: string)`

This asynchronous function reads a Markdown file associated with a specific section and category from the `static/docs` folder. It is intended for use with SvelteKit dynamic routes and should be placed inside the server load function. It returns a promise that resolves to an array containing two elements:

1. `{ md: string; toc: { degree: number; name: string }[] } | null`: An object with the Markdown content (`md`) and the table of contents (`toc`). If the file is successfully read, this object will contain the Markdown content and its corresponding table of contents. Otherwise, it will be `null`.

2. `ReadFileError | null`: An error object (`ReadFileError`) if there was an issue reading the file. If successful, this will be `null`.

#### `generateTableOfContents(mdText: string)`

This function generates a table of contents from the provided Markdown text. It takes the Markdown text as input and returns an array of objects, where each object represents a table of contents entry with the following properties:

- `degree`: The heading level of the entry.
- `name`: The name or text of the heading.

#### `findSectionNeighbors(sectionsMap: Map<string, string[]>, sectionName: string)`

Given a `sectionsMap` (a map that associates section names with categories) and a `sectionName`, this function finds the previous and next sections within the map based on the current section. It returns an object with two properties:

- `previous`: An object representing the previous section, containing `section` (the section name) and `category` (the associated category).
- `next`: An object representing the next section, containing `section` (the section name) and `category` (the associated category).

#### `getCategory(sectionName: string, sectionsMap: Map<string, string[]>)`

This function retrieves the category associated with a given `sectionName` from the provided `sectionsMap`. It returns the category as a string. If no category is found, it returns an empty string.

#### `scrollToHeader(headerId: string, offset: number)`

This function scrolls the document to a specific header element based on its `headerId`. It calculates the target position based on the `offset` provided and smoothly scrolls to the header.

#### `headerOnView(callback: (headerText: string) => void, topSectionThreshold: number)`

This function listens for scroll events in the document and triggers a callback function with the header text when a header element comes into view. The `topSectionThreshold` determines when the header is considered "in view."

#### `closeSectionMenu(callback: () => void)`

This function listens to changes in screen width (e.g., on mobile devices) and triggers a callback when the screen width is greater than or equal to 768 pixels. It can be used to close a section menu when the

screen size changes.

#### `getColorLevels(color: string): [string, string, string]`

Given a color in hexadecimal format (`color`), this function converts it to RGB format and returns an array of three color levels:

- `level800`: The color in RGB format.
- `level400`: The color with reduced opacity (53% opacity) in RGBA format.
- `level100`: The color with further reduced opacity (14% opacity) in RGBA format.

#### `copyToKeyboard(text: string, timeout: number, cb: (state: boolean) => void)`

This function copies the provided `text` to the user's clipboard and invokes a callback function with a boolean value to indicate the copy state. It sets the `state` to `true` when the text is successfully copied and `false` after a specified `timeout`.

#### `removeUrlEncoding(encodedString: string)`

This function decodes URL-encoded characters in a given `encodedString` and returns the decoded string. It is used to revert URL-encoded strings to their original form.

These functions are essential for various aspects of the `sveltedocsmaker` package, such as reading Markdown content, generating table of contents, scrolling to headers, and handling UI interactions.

## License

This package is distributed under the [MIT License](link-to-license-file).
````
