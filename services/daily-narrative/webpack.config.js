const path = require('path');
const webpack = require('webpack');
const serverlessWebpack = require('serverless-webpack');

module.exports = {
  // Allow Serverless to define entry points for the handler(s) at compile time
  entry: serverlessWebpack.lib.entries,

  // Module resolutions
  resolve: {

    // Provide alias to point at root directory
    alias: {
      ['@']: path.resolve(__dirname, 'src'),
      ['@@']: path.resolve(__dirname)
    }
  },

  // Build mode
  mode: serverlessWebpack.lib.webpack.isLocal ? "development" : "production"
};