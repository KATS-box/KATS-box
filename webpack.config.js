const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/build/',
    hot: true,
    proxy: {
        '/api': 'http://localhost:3000'
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
        test: /\.s[ac]ss$/i,
        include: [path.resolve(__dirname, 'client')],
        exclude: /node_modules/,
        use: ['style-loader' , 'css-loader']
      },
    ],
  },
}