const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const chunks = ['main', 'polyfills'];
const enteries = chunks.reduce((result, chunk) => {
  result[chunk] = `./wwwroot/src/${chunk}.ts`;
  return result;
}, {});

module.exports = (__dirname) => {
  const PATH_SRC = path.join(__dirname, 'wwwroot', 'src');
  const PATH_DIST = path.join(__dirname, 'wwwroot', 'dist');
  const PATH_NODE = path.join(__dirname, 'node_modules');
  const PATH_CONFIGS = path.join(__dirname, '.build');
  const PATH_CONFIG_TS = path.join(PATH_CONFIGS, 'typescript', 'tsconfig.json');
  const PATH_CONFIG_POSTCSS = path.join(PATH_CONFIGS, 'postcss', 'postcss.config.js');
  const PATH_MANIFEST = path.join(PATH_DIST, 'vendor-manifest.json');

  return {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', 'scss', 'css'],
      modules: [PATH_SRC, PATH_NODE]
    },
    entry: enteries,
    output: {
      path: PATH_DIST,
      filename: '[name].js',
      publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, include: PATH_SRC,
          use: { loader: 'awesome-typescript-loader', options: { configFileName: PATH_CONFIG_TS } }
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              { loader: 'postcss-loader', options: { config: { path: PATH_CONFIG_POSTCSS } } },
              'sass-loader'
            ]
          })
        },
        {
          test: /(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
          use: { loader: 'url-loader', options: { limit: 10000 } }
        },
      ]
    },
    plugins: [
      new ManifestPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({ name: chunks }),
      new webpack.DllReferencePlugin({ context: __dirname, manifest: require(PATH_MANIFEST) }),
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
    ],
  }
}
