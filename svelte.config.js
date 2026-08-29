import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const adapters = { node: adapterNode, cloudflare: adapterCloudflare };

export default {
  preprocess: vitePreprocess(),
  kit: { adapter: (adapters[process.env.ADAPTER] ?? adapterCloudflare)() }
};
