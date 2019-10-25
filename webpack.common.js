const path = require("path");
const glob = require("glob");
const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");

var entries = {
  calendar: "./js/calendar.js",
  home: "./js/login.js",
  chat: "./js/chat.js",
  home: "./js/home.js",
  "personal-info": "./js/personal-info.js",
  "company-info": "./js/company-info.js",
  "hr-management": "./js/hr-management.js",
  "add-emergency-contact": "./js/personal-info.js"
};

module.exports = env => {
  let isDev = env.development;

  let entryHtmlPlugins = Object.keys(entries).map(function(entryName) {
    return new HtmlWebpackPlugin({
      filename: entryName + ".html",
      template: path.resolve(__dirname, "./" + entryName + ".html"),
      chunks: [entryName],
      minify: !isDev && {
        collapseWhitespace: true,
        removeComments: true
        // removeAttributeQuotes: true
      }
    });
  });
  const base = {
    entry: entries,
    output: {
      filename: "bundle-[name].js",
      path: path.resolve(__dirname, "./dist")
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                sourceMap: true,
                plugins: [
                  require("autoprefixer")({
                    overrideBrowserslist: [">1%", "last 2 versions"]
                  })
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sassOptions: {
                  includePaths: ["node_modules", "node_modules/@material/*"]
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "url-loader", //根據圖片大小，把圖片優化成base64
              options: {
                limit: 10000,
                name: "[name][hash].[ext]",
                publicPath: "./images",
                outputPath: "/images"
              }
            },
            {
              loader: "image-webpack-loader", // 圖片優化
              // include: [path.resolve(__dirname, 'src/')],
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"]
              }
            }
          ]
        },
        {
          test: /\.(html)$/,
          include: path.join(__dirname, "/assets"),
          use: {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "div:style"],
              interpolate: true
            }
          }
        }
        // {
        //   test: /\.(html)$/,
        //   use: {
        //     loader: "html-loader",
        //     options: {
        //       //   attrs: ["img:src", "div:style"]
        //       // interpolate: true
        //     }
        //   }
        // }
      ]
    },
    plugins: [
      !isDev &&
        new MiniCssExtractPlugin({
          // 如果是开发模式就不要使用抽离样式的插件
          filename: "[name].css",
          chunkFilename: "[id].css"
        }),
      new CleanWebpackPlugin()
    ]
      .concat(entryHtmlPlugins)
      .filter(Boolean)
  };
  // 函数要返回配置文件，没返回会采用默认配置
  if (isDev) {
    return merge(base, dev); // 循环后面的配置 定义到前面去
  } else {
    return merge(base, prod);
  }
};

// const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //將css樣式提取成css文件而非css loader注入html的style
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const htmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// module.exports = {
//   entry: { chat: "./js/chat.js" },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src/")
//     },
//     extensions: [".js", ".vue", ".json"] //默認值[".js",".json"]
//   },
//   externals: {
//     //把一個模塊做成外部依賴，不會打包到js文件中
//     jquery: "jQuery"
//     // lodash: '_'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(png|jpg|gif|svg)$/,
//         use: [
//           {
//             loader: "url-loader", //根據圖片大小，把圖片優化成base64
//             options: {
//               limit: 10000,
//               name: "[name][hash].[ext]",
//               publicPath: "./images",
//               outputPath: "/images"
//             }
//           },
//           {
//             loader: "image-webpack-loader", // 圖片優化
//             // include: [path.resolve(__dirname, 'src/')],
//             options: {
//               mozjpeg: {
//                 progressive: true,
//                 quality: 65
//               },
//               optipng: {
//                 enabled: false
//               },
//               pngquant: {
//                 quality: "65-90",
//                 speed: 4
//               },
//               gifsicle: {
//                 interlaced: false
//               },
//               webp: {
//                 quality: 75
//               }
//             }
//           }
//         ]
//       },
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: [
//           {
//             loader: "babel-loader",
//             options: {
//               presets: ["@babel/preset-env"]
//             }
//           }
//           // {
//           //   loader: "eslint-loader",
//           //   options: {
//           //     fix: true
//           //   }
//           // }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new htmlWebpackPlugin({
//       filename: "chat.html",
//       template: path.resolve(__dirname, "./chat.html"),
//       minify: {
//         collapseWhitespace: true,
//         removeComments: true, //是否移除註解
//         removeAttributeQuotes: true //是否移除屬性雙引號
//       }
//     }),
//     new CleanWebpackPlugin()
//   ]
// };
