const merge = require('webpack-merge');

module.exports = function (__dirname, env) {
  return merge(require('./common')(__dirname), require(`./${env}.js`));
};
