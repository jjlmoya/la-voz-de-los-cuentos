import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import astro from '@astrojs/vite-plugin-astro';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '*/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]'
            }
        }
    },
    plugins: [  
        astro(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
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
                        "src": "img/icons/512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "img/icons/192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "img/icons/512x512.png",
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
        })
    ]
});
