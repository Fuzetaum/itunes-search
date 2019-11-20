const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = function(env, isProduction) {
  return {
    entry: ['babel-polyfill', path.resolve('./', 'src')],
    output: {
      path: path.resolve('./', 'build'),
      filename: '[name].[hash].js',
      publicPath: '/',
      library: 'library',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: [path.resolve('./', 'node_modules')],
          loader: 'babel-loader',
        },
        {
          test: /\.(jpe?g|svg|png|gif)$/,
          include: path.resolve(__dirname, '../src/assets'),
          loader: 'file-loader',
          options: {
            outputPath: 'images',
          },
        },
        {
          test: /\.css$/,
          exclude: [path.resolve('./', 'node_modules')],
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: !isProduction,
                localsConvention: 'camelCase'
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: [path.resolve('./', 'src')],
          use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: [path.resolve('./', 'node_modules')],
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: !isProduction,
                localsConvention: 'camelCase',
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: !isProduction },
            }
          ],
        },
      ],
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src'),
      ],
      extensions: ['.js', '.jsx', '.json'],
    },
    context: path.resolve(__dirname, '../'),
    target: 'web',
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[hash:8].css",
        chunkFilename: "[id].[hash:8].css"
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve('./', 'public/index.html'),
        filename: 'index.html',
        // favicon: path.resolve('./', 'src/assets/images/favicon.ico'),
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': JSON.stringify('https://itunes.apple.com/search'),
        },
      }),
    ],
  };
}