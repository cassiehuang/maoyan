const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html，并将最终生成的js，css等动态插入其中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin'); //静态资源拷贝
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : '#cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, '../src/main.js'),
    //index: ['webpack-hot-middleware/client?noInfo=true&reload=true', path.resolve(__dirname, '../src/main.js')],
  },

  output: {
    path: path.resolve(__dirname, '../dist/'), //dev-middleware下此配置项无效，因为存入内存中
    publicPath: '/dist/',  //相对于服务
    filename: '[name].[chunkhash].js',  //每个输出bundle的名称
    // chunkFilename: '[name].[chunkhash].js' //非入口文件的名字，可不配置
  },

  resolve: {
    //扩展名，当引入文件没写扩展名时
    extensions: ['.json', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  externals: {
    jquery: 'jQuery',  // 防止将import的包导到bundle，而是在运行时再从外部取获取这些依赖
  },
  stats: { children: false },
  module: {
    noParse: /es6-promise\.js$/,  //防止webpack解析
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            preserveWhitespace: true
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        //将文件转为base64 uri
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(le|c)ss$/,
        oneOf: [
          {
            test: /App/,
            resourceQuery: /\?vue/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] //MiniCssExtractPlugin.loader提取css
          },
          {
            use: ['vue-style-loader', 'css-loader', 'less-loader']
          }
        ],
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: '/[name].[ext]?[hash:7]',
          prefix: 'font'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.template.html'),
      chunks: ['manifest', 'commons', 'app', 'vendor'],
    }),
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css', //提取css
    }),
  ],
  optimization: {  //weboack4新增，用于代码分割和打包优化
    runtimeChunk: {
      name: 'manifest' //单独打包压缩运行时webpack代码
    },
    splitChunks: {
      cacheGroups: {
        // commons: {
        //   name: 'commons', //共享模块的名字
        //   chunks: 'initial', //初始化的chunks async指所需要的chunks， all是指所有
        //   minChunks: 2
        // }
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendor:{
          name: 'vendor',
          test(module) {
            return (
              // 在node_modules目录下
              /node_modules/.test(module.context) &&
              // 不是css文件
              !/\.css$/.test(module.request)
            );
          }
        }
      }
    },
    minimizer: [new OptimizeCssAssetsPlugin({}), new UglifyJsPlugin({})],//压缩css,默认只添加js压缩，
    minimize: isProd, //默认在production模式下为true，控制minimizer
  },
  performance: {
    maxEntrypointSize: 300000,  //此选项根据单个资源体积，控制 webpack 何时生成性能提示(byte)
    hints: isProd ? 'warning' : false,
  },
};
