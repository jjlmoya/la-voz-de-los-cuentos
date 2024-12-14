import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from "@astrojs/sitemap";
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    site: process.env.PUBLIC_SITE_URL,
    integrations: [sitemap({
        filter: (page) => !page.includes('newsletter') && !page.includes('tgc'),
    }), vue({
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