const plugins = []

if (process.env.NODE_ENV === 'test_integration') {
  plugins.push([
    "babel-plugin-istanbul", {
      extension: ['.js', '.vue'],
    }
  ])
}

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  plugins
}
