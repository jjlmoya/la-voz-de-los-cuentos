import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: 'https://lavozdeloscuentos.es',
    integrations: [sitemap(), vue()],
    trailingSlash: 'always',
});