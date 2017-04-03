'use strict';


module.exports = {
  entry: './injects.ts',
  target: 'node',
  output: {
    path: __dirname,
    filename: `build/injects.js`,
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { 
          emitErrors: true,
          failOnHint: true
        }
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: "source-map-loader"
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        query: {
          presets: ["es2015"]
        }
      }
    ]
  }
};
