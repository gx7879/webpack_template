const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        //js壓縮
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}) //css壓縮
    ]
  }
};

// const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //將css樣式提取成css文件而非css loader注入html的style
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const htmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const merge = require("webpack-merge");
// const common = require("./webpack.common");

// let prodConfig = {
//   mode: "production",
//   output: {
//     filename: "[name].[hash].js",
//     path: path.resolve(__dirname, "dist")
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use: [
//           // 'style-loader',
//           MiniCssExtractPlugin.loader,
//           {
//             loader: "css-loader",
//             options: {
//               sourceMap: true
//             }
//           },
//           {
//             loader: "postcss-loader",
//             options: {
//               ident: "postcss",
//               sourceMap: true,
//               plugins: [
//                 require("autoprefixer")({
//                   overrideBrowserslist: ["> 1%", "last 2 versions"]
//                 })
//               ]
//             }
//           },
//           // {
//           //     loader: 'postcss-loader',
//           //     options: {
//           //         ident: 'postcss',
//           //         sourceMap: true,
//           //         plugins: [
//           //             require('autoprefixer')({
//           //                 browsers: ['> 1%', 'last 2 versions']
//           //             })
//           //         ]
//           //     }
//           // },
//           {
//             loader: "sass-loader",
//             options: {
//               sourceMap: true,
//               sassOptions: {
//                 includePaths: ["node_modules", "node_modules/@material/*"]
//               }
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: "[name][hash].css",
//       chunkFilename: "[id][hash].css"
//     })
//   ],
//   optimization: {
//     minimizer: [
//       new UglifyJsPlugin({
//         //js壓縮
//         cache: true,
//         parallel: true,
//         sourceMap: true // set to true if you want JS source maps
//       }),
//       new OptimizeCSSAssetsPlugin({}) //css壓縮
//     ]
//   }
// };

// module.exports = merge(common, prodConfig);
