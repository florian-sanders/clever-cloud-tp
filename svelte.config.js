
import { resolve } from 'path';

import adapter from "@sveltejs/adapter-static";

import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			pages: "build",
			assets: "build",
			fallback: null,
		  }),
		vite: {
			resolve: {
				alias: {
					$components: resolve('./src/components'),
					$stores: resolve('./src/stores'),
					$interfaces: resolve('./src/interfaces'),
					$utilities: resolve('./src/utilities')
				}
			}
		}
	}
};

export default config;
