const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const { merge } = require("webpack-merge")

const prodConfig = require("./webpack.prod")
const devConfig = require("./webpack.dev")

const commonConfig = {
  devtool: "cheap-module-source-map",
  // entry: "./src/index.js",
  entry: {
    mian: "./src/main.js",
    index: "./src/index.js"
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "../build")
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.vue'],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "pages": path.resolve(__dirname, "../src/pages")
    }
  },
  // optimization: {
  //   //对代码进行压缩等操作
  //   minimizer: [
  //     new TerserPlugin({
  //       extractComments: false
  //     })
  //   ]
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        test: /\.jsx?$/i,
        use: "babel-loader"
      }, 
      {
        test: /\.vue$/i,
        use: "vue-loader",
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
}

module.exports = function(env) {
  const isDevelopment = env.development;
  process.env.NODE_ENV = isDevelopment ? "development" : "production"

  const config = isDevelopment ? devConfig : prodConfig;
  const mergeConfig = merge(commonConfig, config);
  return mergeConfig;
}

