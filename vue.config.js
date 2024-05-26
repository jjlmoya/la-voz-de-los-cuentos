const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  transpileDependencies: true,
})
