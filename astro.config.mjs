import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: 'https://lavozdeloscuentos.es',
    integrations: [sitemap(), vue({
        template: {
            compilerOptions: {
                isCustomElement: (tag) => {
                    return tag.startsWith('lite') // (return true)
                }
            }
        }
    })],
    trailingSlash: 'always',
    customElement: {
        include: ['lite-youtube'],
    },
});