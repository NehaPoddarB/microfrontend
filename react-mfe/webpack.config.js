const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = options => {
  return {
    entry: './index.js',
  output: {
      filename: 'bundle.js',
      publicPath: "auto",
      uniqueName: "mfe4"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  module: {
      rules: [{
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/react', '@babel/env', '@babel/preset-flow']
          }
        }, ],
      }, ],
        },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
        name: "react",
        library: {
          type: "var",
          name: "react"
        },
        filename: "remoteEntry.js", // <-- Meta Data
      exposes: {
        './web-components': './app.js',
          './react-component-1': './reactComponentOne.js',
      },
        shared: ["react", "react-dom"]
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './*.html'
      }]
      })
  ],
    devServer: {
      port: 4204
    }
  }
}