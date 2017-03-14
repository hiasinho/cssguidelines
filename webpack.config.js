const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const kss = require('kss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

class KssPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    compiler.plugin('compile', (params) => {
      kss(this.options)
    })
  }
}

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./js/entry.js', './sass/styles.scss']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new KssPlugin({
      source: "src/sass",
      css: [
        "http://localhost:8080/dist/app.css"
      ],
      js: [
        "http://localhost:8080/dist/app.js"
      ],
      title: "Macho",
      homepage: "homepage.md",
      builder: "builder/handlebars"
    })
  ]
};

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';

  module.exports.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
  module.exports.entry.app.unshift("webpack/hot/only-dev-server");

  module.exports.output.publicPath = "http://localhost:8080/";

  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
  module.exports.plugins.push(new webpack.NoEmitOnErrorsPlugin());

  module.exports.devServer = {
    inline: true,
    publicPath: "/dist/"
  //   contentBase: path.join(__dirname, "dist"),
  //   // compress: true,
  //   // port: 9000
  }

} else {
  module.exports.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
