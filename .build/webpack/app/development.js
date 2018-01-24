console.log('@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ]
};
