const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },

  devServer: {
    publicPath: '/',
    contentBase: "./public",
    historyApiFallback: true,
    hot: true,
    proxy: {
        '/': 'http://localhost:3000'
    },
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, 'client')],
        exclude: /node_modules/,
        use: ['style-loader' , 'css-loader']
      },
      { 
        test: /\.(png|jpe?g|gif)$/i,
         loader: 'file-loader' 
        },
    ],
  },
}