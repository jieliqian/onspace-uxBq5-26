module.exports = function (api) {
  api.cache(false)
  return {
    presets: ['babel-preset-expo'],
    // plugins: ['./babel-plugins/react-dev-inspector.js'], // 使用本地插件路径
  }
}
