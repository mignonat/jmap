const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const currentDir = path.resolve('.')
const excludeDirs = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "node")
]

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js',
    chunkFilename: '[name].[ext]?[hash]'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
          // the "scss" and "sass" values for the lang attribute to the right configs here.
          // other preprocessors should work out of the box, no loader config like this necessary.
          'scss': 'vue-style-loader!css-loader!sass-loader',
          'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
        }
      },
      include: [ path.resolve(currentDir, 'src') ]
    },{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
      },
      include: [ path.resolve(currentDir, 'src') ]
    },{
      test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
      loader: "file-loader",
    },{
      test : /\.js$/,
      loader: 'babel-loader',
      include: [ path.resolve(currentDir, 'src') ]
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    modules: [ //tell webpack where to search for import
      path.resolve(path.resolve('.'), 'src'), //allow importing file without starting by "src/"
      path.resolve(currentDir, 'node_modules')
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  }
}

if (process.env.NODE_ENV !== 'production') {
  // development environment
  module.exports.mode = 'development'
  module.exports.devtool = '#eval-source-map'
  module.exports.resolve.alias = {
    'vue': 'vue/dist/vue.esm.js',
    'vuex': 'vuex/dist/vuex.esm.js',
    'vuetify-css': 'vuetify/dist/vuetify.css'
  }
} else {
  // production environment
  module.exports.mode = 'production'
  module.exports.devtool = '#source-map'
  module.exports.resolve.alias = {
    'vue': 'vue/dist/vue.min.js',
    'vuex': 'vuex/dist/vuex.min.js',
    'vuetify-css': 'vuetify/dist/vuetify.min.css'
  }
  module.exports.optimization = {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          beautify: false,
          compress: {
            warnings: false
          },
          comments: false,
          mangle: false,
          toplevel: false,
          keep_classnames: true,
          keep_fnames: true,
        }
      })
    ]
  }
}

if (process.env.PROCESS_ANALYSER) {
  /**
   * Used to analyse the size/content of the bundles generated by webpack
   * After webpack build a browser tab will open automatically showing the result
   * If not open, accessible on http://127.0.0.1:8888
   * */
  module.exports.plugins = (module.exports.plugins || []).concat([
    new BundleAnalyzerPlugin()
  ])
}