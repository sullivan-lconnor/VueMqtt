const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ya?ml$/,
          use: 'yaml-loader',
          type: 'json'
        }
      ]
    }
  }
})
