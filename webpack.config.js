const plugins = require('./webpack/plugins');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const sourcePath = `${__dirname}/src/client`;
const staticsPath = '/static';
// const distPath = `${__dirname}/dist`;

module.exports = {
  devtool: 'source-map',
  context: sourcePath,
  entry: {
    app: './index.jsx',
    vendor: [
      'react',
      'react-dom',
    //   'react-redux',
      'react-router',
    //   'react-router-redux',
    //   'redux'
    ]
  },
  output: {
    path: `${staticsPath}`,
    filename: '[name].js',
    publicPath: staticsPath
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
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
    modules: [
      `${__dirname}/node_modules`,
      sourcePath
    ]
  },
  plugins,
  devServer: {
    contentBase: sourcePath,
    publicPath: staticsPath,
    historyApiFallback: true,
    port: 3001,
    compress: isProd,
    lazy: false,
    inline: !isProd,
    hot: !isProd,
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
  }
};
