import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


const config = {
	// Consult https://svelte.dev/docs/kit/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),


	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'hash', // 保持 hash 模式，安全且支持内联脚本/样式
			directives: {
			  'script-src': ['self'], 
			  'style-src': ['self'],
			  'img-src': ['self', 'data:'], 
			  'object-src': ['none'], 
			}
		  },
		router: {
			type: 'hash'
		}
	}
	
};

export default config;