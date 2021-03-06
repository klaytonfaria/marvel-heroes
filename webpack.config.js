const webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  Extractor = require("extract-text-webpack-plugin"),

  sourcePath = `${__dirname}/src/client`,
  staticsPath = '/',
  plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor-[hash].js',
    }),
    new webpack.DefinePlugin({
      postcss: [autoprefixer({ browsers: ['last 2 versions', 'ie 7-8', 'Firefox > 20'] })]
    }),
    new HtmlWebpackPlugin({
      title: 'Marvel Heroes - Browse all Marvel heroes.',
      filename: 'index.html',
      template: `${__dirname}/src/client/index.ejs`,
      inject: false
    }),
    new Extractor("app-[hash].css")
  ],

  devServer = {
    publicPath: staticsPath,
    historyApiFallback: true,
    port: 3001,
    compress: false,
    lazy: false,
    inline: false,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: true,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  };


module.exports = {
  cache: true,
  devtool: 'source-map',
  context: sourcePath,
  entry: {
    app: './index.jsx',
    vendor: [
      'react',
      'react-dom',
      'react-router'
    ]
  },

  output: {
    path: `${staticsPath}`,
    filename: '[name]-[hash].js',
    publicPath: staticsPath
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        loader: Extractor.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader'})
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [`${__dirname}/node_modules`, sourcePath]
  },

  performance: {
    hints: false
  },

  plugins,
  devServer
};