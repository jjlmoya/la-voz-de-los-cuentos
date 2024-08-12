import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from "@astrojs/sitemap";
import dotenv from 'dotenv';
dotenv.config();

console.log('PUBLIC_SITE_URL:', process.env.PUBLIC_SITE_URL);

export default defineConfig({
    site: process.env.PUBLIC_SITE_URL,
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