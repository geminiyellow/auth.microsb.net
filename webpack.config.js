module.exports = function ({ env, target }) {
  return require(`./.build/webpack/${target}`)(__dirname, env);
};
