const merge = require('webpack-merge');
const path = require('path');

const common = require('./common.config.js');

module.exports = env => merge(common(env, false), {
  mode: 'development',
  devServer: {
    contentBase: false,
    compress: false,
    historyApiFallback: true,
    open: true,
    port: 5050,
    stats: 'minimal',
  },
});
