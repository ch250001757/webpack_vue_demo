const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path')

module.exports = {
  mode: "production", // 这个设置这个模式，生成阶段压缩代码
  entry: "./src/main.js",
  // 开发阶段，暂时不需要配置output
  output:{
    path:path.join(__dirname,"dist"),
    filename:'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    // vue-loader 升级到15.x之后必须要这样写
    new VueLoaderPlugin(),
    // 把开发阶段生成的bundle.js注入到 public/index中去
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify:{ // 压缩html
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
};
