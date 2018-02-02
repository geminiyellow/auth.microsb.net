const ExtractTextPlugin = require('extract-text-webpack-plugin');
const shakableModules = [];

module.exports = {
  module: {
    rules: [
      {
        test: /\.css(\?|$)/,
        use: ExtractTextPlugin.extract({ use: 'css-loader?sourceMap' })
      },
    ]
  },
  entry: {
    // To keep development builds fast, include all vendor dependencies in the vendor bundle.
    // But for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
    vendor: shakableModules
  },
};
