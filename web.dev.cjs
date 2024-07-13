const { merge } = require('webpack-merge');
const common = require('./web.common.cjs');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    watchFiles: ['src/**/*.html', 'src/**/*.css'],
  },
});
