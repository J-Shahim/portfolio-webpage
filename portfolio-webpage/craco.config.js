module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the existing rule for assets (file-loader)
      const assetRule = webpackConfig.module.rules.find((rule) =>
        rule.oneOf
      );
      if (assetRule) {
        assetRule.oneOf.unshift({
          test: /\.md$/i,
          type: 'asset/source',
        });
      }
      return webpackConfig;
    },
  },
};