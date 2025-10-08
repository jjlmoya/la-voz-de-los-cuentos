import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel';
import dotenv from 'dotenv';
dotenv.config();

const EXCLUDED_PATTERNS = ['newsletter', 'tgc', 'debug'];

const shouldIncludePage = (page) => {
    return !EXCLUDED_PATTERNS.some(pattern => page.includes(pattern));
};

export default defineConfig({
    site: process.env.PUBLIC_SITE_URL,
    output: 'static',
    adapter: vercel(),
    integrations: [
        sitemap({
            filter: shouldIncludePage
        }),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('lite'),
                }
            }
        })
    ],
    trailingSlash: 'always',
    customElement: {
        include: ['lite-youtube'],
    },
});
