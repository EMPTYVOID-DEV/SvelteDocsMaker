import { readMd } from '$lib/extra/utils';
import { error, type Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const [data, err] = await readMd(params.section, params.category);
	if (err) {
		console.log(err);
		throw error(404, 'doesnt exist');
	}
	return data;
};
