import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

const isLibraryBuild = process.env.BUILD_LIB === 'true';

const domain = process.env.PUBLIC_SITE_URL;
const lang = process.env.PUBLIC_LANG;

const manifestMap = {
    'https://lavozdeloscuentos.es': {
        registerType: 'autoUpdate',
        includeAssets: ['img/icons/es/512x512.webp', 'robots.txt', 'img/icons/es/32x32.webp'],
        manifest: {
            "id": "la-voz-de-los-cuentos",
            "name": "La Voz De los Cuentos",
            "short_name": "LaVozDeLosCuentos",
            "description": "Embárcate en un viaje encantado a través de La Voz de los Cuentos, donde cada historia cobra vida y la magia de la narración te envuelve. Descubre relatos antiguos y nuevos, llenos de fantasía, misterio y maravillas, en un reino donde la imaginación no tiene límites.",
            "orientation": "portrait",
            "theme_color": "#4DBA87",
            "background_color": "#ffffff",
            "display": "standalone",
            "scope": "/",
            "start_url": "/",
            "display_override": ["window-controls-overlay", "standalone"],
            "screenshots": [
                {
                    "src": "img/screenshots/1.png",
                    "sizes": "640x480",
                    "type": "image/png"
                },
                {
                    "src": "img/screenshots/2.png",
                    "sizes": "640x480",
                    "type": "image/png"
                }
            ],
            "icons": [
                {
                    "src": "img/icons/es/512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any"
                },
                {
                    "src": "img/icons/es/192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "img/icons/es/512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ],
            "launch_handler": {
                "client_mode": "auto"
            },
            "edge_side_panel": {
                "preferred_width": 400
            }
        }
    },
    'https://buboboo.com': {
        registerType: 'autoUpdate',
        includeAssets: ['img/icons/en/512x512.webp', 'robots.txt', 'img/icons/en/32x32.webp'],
        manifest: {
            "id": "buboboo",
            "name": "Bubo Boo",
            "short_name": "BuboBoo",
            "description": "Get ready for a magical adventure with Bubo Boo, where every story comes to life and the magic of storytelling wraps around you like a warm hug. Dive into tales old and new, full of fantasy, mystery, and wonder, in a world where your imagination can soar as high as you want!",
            "orientation": "portrait",
            "theme_color": "#4DBA87",
            "background_color": "#ffffff",
            "display": "standalone",
            "scope": "/",
            "start_url": "/",
            "display_override": ["window-controls-overlay", "standalone"],
            "screenshots": [
                {
                    "src": "img/screenshots/1.png",
                    "sizes": "640x480",
                    "type": "image/png"
                },
                {
                    "src": "img/screenshots/2.png",
                    "sizes": "640x480",
                    "type": "image/png"
                }
            ],
            "icons": [
                {
                    "src": "img/icons/en/512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any"
                },
                {
                    "src": "img/icons/en/192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "img/icons/en/512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ],
            "launch_handler": {
                "client_mode": "auto"
            },
            "edge_side_panel": {
                "preferred_width": 400
            }
        }
    }
};

const getManifestMap = () => manifestMap[domain];

export default defineConfig({
    build: {
        lib: {
            entry: 'src/library.js',
            name: 'LaVozDeLosCuentos',
            fileName: `lavozdeloscuentos`
        },
        rollupOptions: isLibraryBuild ? {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        } : {
            output: {
                entryFileNames: '[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]'
            }
        }
    },
    plugins: [
        vue(),
        !isLibraryBuild && astro(),
        !isLibraryBuild && VitePWA(getManifestMap())
    ].filter(Boolean)
});