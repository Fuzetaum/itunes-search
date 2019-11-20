const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');

const common = require('./common.config.js');

module.exports = env => merge(common(env, true), {
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      automaticNameMaxLength: 30,
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      minSize: 30000,
      maxSize: 0,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      root: process.cwd(),
      verbose: true,
      dry: false,
    }),
    new OptimizeCssAssetsPlugin(),
    new MomentLocalesPlugin(),
    new ManifestPlugin(),
  ],
});
