const DumpVueEnvVarsWebpackPlugin = require("./src/plugins/DumpVueEnvVarsWebpackPlugin.js")

module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    https: false,
  },

  configureWebpack: {
    plugins: [new DumpVueEnvVarsWebpackPlugin({ filename: "sw-env-vars.js" })],
  },

  pwa: {
    name: "smartnews-visu-front",
    workboxPluginMode: "InjectManifest", // 'GenerateSW'
    workboxOptions: {
      swSrc: "src/service-worker-plugin.js",
      importWorkboxFrom: "local",
      swDest: "service-worker.js",
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'lang',
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true
    }
  }
}
