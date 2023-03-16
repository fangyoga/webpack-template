const { merge: mergeWebpackConfig } = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');
const getStyleLoader = require('./getStyleLoader');

module.exports = mergeWebpackConfig(baseConfig, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000,
    hot: true,
    open: true,
    client: {
      overlay: false, // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
    },
    compress: true, // 启用gzip压缩
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'jsChunk/[name].chunk.js',
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      ...getStyleLoader('development'),
    ],
  },
});
