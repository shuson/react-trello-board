/* eslint-disable global-require, react/jsx-first-prop-new-line */
const path = require('path');
const webpack = require('webpack');
const shell = require('shelljs');

shell.rm('-rf', './dist');

module.exports = {
  devtool: 'eval',

  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test: /\.(jpg|jpeg|gif|png|ico|ttf|otf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=[path][name].[ext]'
    }]
  },
  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};
