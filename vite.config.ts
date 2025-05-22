import { sveltekit } from '@sveltejs/kit/vite';

export default {
	plugins: [
	  sveltekit(),
	],
	resolve: {
		alias: {
		  $lib: './src/lib' 
		}
	  },
  }