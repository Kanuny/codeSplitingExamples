const argv = require('yargs').argv;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config');
const debug = require('debug')('app:config:webpack');

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;

debug('Creating configuration.');
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: project.compiler_devtool,
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: [ '.js', '.jsx', '.json' ],
  },
  module: {},
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js');

webpackConfig.entry = {
  app: __DEV__
    ? [ APP_ENTRY ].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
    : [ APP_ENTRY ],
  vendor: project.compiler_vendors,
  common: [ 'common/data' ]
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${project.compiler_hash_type}].js`,
  path: project.paths.dist(),
  publicPath: project.compiler_public_path,
};

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(project.globals),
  new HtmlWebpackPlugin({
    template: project.paths.client('index.html'),
    hash: false,
    favicon: project.paths.public('favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
  }),
];

if (__DEV__) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    })
  );
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor', 'common' ],
    })
  );
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [ {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: project.compiler_babel,
} ];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
  },
};

webpackConfig.module.rules.push({
  test: /\.scss$/,
  use: [
    'style-loader',
    BASE_CSS_LOADER,
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        includePaths: project.paths.client('styles'),
      },
    },
  ]
});
webpackConfig.module.rules.push({
  test: /\.css$/,
  use: [
    'style-loader',
    BASE_CSS_LOADER,
    'postcss-loader',
  ]
});

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url-loader?limit=8192' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Applying ExtractTextPlugin to CSS loaders.');
  webpackConfig.module.rules.filter((loader) =>
    loader.loaders && loader.rules.find((name) => /css-loader/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.rules[0];
    const rest = loader.rules.slice(1);
    loader.loader = ExtractTextPlugin.extract({
      fallbackLoader: loader.rules[0],
      use: rest,
    });
    delete loader.rules;
  });

  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    })
  );
}

module.exports = webpackConfig;
