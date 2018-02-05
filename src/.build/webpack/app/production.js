console.log('@@@@@@@@@ USING PRODUCTION @@@@@@@@@@@@@@@');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[hash:6].js',
    chunkFilename: '[id].[hash:6].js',
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash:6].css'),

    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      minimize: true,
      mangle: false // Due to https://github.com/angular/angular/issues/6678
    })
  ]
};
