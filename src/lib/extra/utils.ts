import fs from 'fs';
import path from 'path';
import { MobileMenuAppear, theme } from './stores';

type ReadFileError =
	| {
			code: 'ENOENT'; // No such file or directory
			message: string;
	  }
	| {
			code: 'EACCES'; // Permission denied
			message: string;
	  }
	| {
			code: 'EISDIR'; // Is a directory
			message: string;
	  }
	| {
			code: string; // Other error codes
			message: string;
	  };

export const changeMode = (ligthMode: boolean) => {
	theme.set(ligthMode);
};

export const changeMobileStatus = (appear: boolean) => {
	MobileMenuAppear.set(appear);
};

export const readMd = async (
	section: string,
	category: string
): Promise<
	[{ md: string; toc: { degree: number; name: string }[] } | null, ReadFileError | null]
> => {
	const rawSection = removeUrlEncoding(section);
	const rawCategory = removeUrlEncoding(category);
	try {
		const md = fs.readFileSync(path.join('static', 'docs', rawCategory, rawSection + '.md'));
		const toc = generateTableOfContents(md.toString());
		return [
			{
				md: md.toString(),
				toc
			},
			null
		];
	} catch (err) {
		return [null, err as ReadFileError];
	}
};
export function generateTableOfContents(mdText: string): { degree: number; name: string }[] {
	const lines = mdText.split('\n');
	const toc: { degree: number; name: string }[] = [];
	const headerRegex = /^(#+)\s+(.*)/;

	for (const line of lines) {
		const match = line.match(headerRegex);
		if (match) {
			const degree = match[1]!.length;
			const name = match[2]!.trim().replace(/[*_]/g, '');
			toc.push({ degree, name });
		}
	}

	return toc;
}

export const findSectionNeigbors = (sectionsMap: Map<string, string[]>, sectioName: string) => {
	const sectionsArray = Array.from(sectionsMap).reduce<string[]>((previous: string[], current) => {
		return previous.concat(current[1]);
	}, []);
	const sectionIndex = sectionsArray.findIndex(
		(section) => section == removeUrlEncoding(sectioName)
	);
	return {
		previous: {
			section: sectionsArray[sectionIndex - 1] || '',
			category: getCategory(sectionsArray[sectionIndex - 1] || '', sectionsMap)
		},
		next: {
			section: sectionsArray[sectionIndex + 1] || '',
			category: getCategory(sectionsArray[sectionIndex + 1] || '', sectionsMap)
		}
	};
};

export const getCategory = (sectioName: string, sectionsMap: Map<string, string[]>) => {
	if (sectioName == '') return '';
	const sectionsArray = Array.from(sectionsMap);
	const mapEntry = sectionsArray.find((entry) => entry[1].includes(sectioName));
	return mapEntry![0];
};

export function scrollToHeader(headerId: string, topSectionThreshold: number) {
	const rawHeaderId = headerId
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[@#:$%^&,./*_?]/g, '');
	const headerTop = document.getElementById(rawHeaderId)!.getBoundingClientRect().top;
	const docs = document.getElementById('docs')!;
	docs.scrollTo({
		top: headerTop + docs.scrollTop - topSectionThreshold,
		behavior: 'smooth'
	});
}

export function headerOnView(callback: (headerText: string) => void, topSectionThreshold: number) {
	const docs = document.getElementById('docs')!;
	docs.addEventListener('scroll', () => {
		const mdHeaders = document.querySelectorAll(
			'#markdown h1,#markdown h2,#markdown h3,#markdown h4'
		);
		let oldThreshold = -1;
		mdHeaders.forEach((header: Element) => {
			const headerInfo = header.getBoundingClientRect();
			const newThreshold = Math.abs(topSectionThreshold - headerInfo.top);
			if ((newThreshold < oldThreshold && newThreshold > 0) || oldThreshold == -1) {
				oldThreshold = newThreshold;
				callback(header.textContent!);
			}
		});
	});
}

export function closeSectionMenu(callback: () => void) {
	const mobileCross = window.matchMedia('screen and (width >= 1024px)');
	mobileCross.addEventListener('change', () => {
		callback();
	});
}

export async function copyToKeyboard(text: string, timeout: number, cb: (state: boolean) => void) {
	navigator.clipboard.writeText(text);
	cb(true);
	await new Promise((res) => setTimeout(res, timeout));
	cb(false);
}

export function removeUrlEncoding(encodedString: string) {
	const decodedString = decodeURIComponent(encodedString);
	return decodedString;
}
