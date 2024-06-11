const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  transpileDependencies: true,
  pwa: {
    name: 'La Voz de los Cuentos',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#ffffff'
    },
    iconPaths: {
      favicon32: 'img/icons/32x32.png',
      favicon16: 'img/icons/16x16.png',
      appleTouchIcon: '152x152.png'
    }
  }
})