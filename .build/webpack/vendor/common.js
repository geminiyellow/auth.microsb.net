const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nonShakableModules = [
  'jquery',
  'bootstrap/dist/css/bootstrap.css',
  'bootstrap/dist/js/bootstrap.js',
];

module.exports = (__dirname) => {
  const PATH_DIST = path.join(__dirname, 'wwwroot', 'dist');
  const PATH_MANIFEST = path.join(PATH_DIST, '[name]-manifest.json');

  return {
    resolve: {
      extensions: ['.js']
    },
    entry: {
      // To keep development builds fast, include all vendor dependencies in the vendor bundle.
      // But for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
      vendor: nonShakableModules
    },
    output: {
      path: PATH_DIST,
      filename: '[name].js',
      library: '[name]_[hash]',
      publicPath: 'dist/',
    },
    module: {
      rules: [
        {
          test: /(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
          use: { loader: 'url-loader', options: { limit: 10000 } }
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin('vendor.css'),
      new webpack.DllPlugin({ path: PATH_MANIFEST, name: '[name]_[hash]' }),
    ]
  }
}
