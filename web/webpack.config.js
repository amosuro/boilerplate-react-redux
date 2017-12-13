const merge = require('webpack-merge');
const bundleUtils = require('./config/bundle-utils');
const commonConfig = require('./config/common');

const env = bundleUtils.getEnv();
console.log(`Bundling for: ${env}`);

const extraConfig = require(`./config/${env}`);
module.exports = merge.smart([commonConfig, extraConfig]);