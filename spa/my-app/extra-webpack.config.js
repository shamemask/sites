const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
module.exports = (angularWebpackConfig, options) => {
  return {
      ...angularWebpackConfig,
      module: {
          ...angularWebpackConfig.module,
          rules: [
              ...angularWebpackConfig.module.rules,
          {
              parser: {
                  system: false
              }
           }
         ]
      }
  };
}