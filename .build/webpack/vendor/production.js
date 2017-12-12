const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css(\?|$)/,
        use: ExtractTextPlugin.extract({ use: 'css-loader?minimize&sourceMap' })
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      minimize: true,
      mangle: false // Due to https://github.com/angular/angular/issues/6678
    })
  ]
};
