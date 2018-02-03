const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
}

// Webpack configuration
module.exports = {
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  entry: ['babel-polyfill', path.join(paths.SRC, 'index.js')],
  output: {
    path: paths.DIST,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    new ExtractTextPlugin('bundle.css'),
  ],
  devServer: {
    contentBase: paths.SRC,
    historyApiFallback: true,
    port: 3030,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
