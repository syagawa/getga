const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  "js": {
    entry: "./src/js/main.js",
    output: {
      filename: "js/bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["es2015"]
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".vue"],
      modules: [
        "node_modules"
      ],
      alias: {
        vue: "vue/dist/vue.common.js"
      }
    }
  },
  "css": {
    entry: [
      "./src/scss/main.scss"
    ],
    output: {
      filename: "css/bundle.css"
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader?-url&minimie!sass-loader"
          })
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader?-url&minimize"
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("css/bundle.css")
    ]
  }
};