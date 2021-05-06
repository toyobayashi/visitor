const path = require('path')
const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const context = path.join(__dirname, '..')

const outDir = path.join(context, 'api')

const configFile = path.join(context, 'tsconfig.json')

const productionSourcemap = false

const nodeConfig = {
  context: context,
  target: 'node',
  entry: {
    index: [
      path.join(context, 'api/_server/index.ts')
    ]
  },
  output: {
    filename: '[name].js',
    path: outDir,
    libraryTarget: 'commonjs2'
  },
  node: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              configFile: configFile
            }
          }
        ]
      }/* ,
      {
        test: /\.node$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('native-addon-loader'),
            options: {
              name: '[name].[ext]',
              from: '.'
            }
          }
        ]
      } */
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.mjs',
      '.cjs',
      '.js',
      '.json',
      '.node',
      '.wasm'
    ]
  },
  externals: [webpackNodeExternals({
    // allowlist: ['tslib']
  })],
  plugins: [],
  devtool: false
}

if (process.env.NODE_ENV === 'development') {
  nodeConfig.mode = 'development'
  nodeConfig.devtool = 'eval-source-map'

  nodeConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
  }))

  nodeConfig.plugins.push(new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: configFile
    }
  }))
  nodeConfig.plugins.push(new webpack.ProgressPlugin())
} else {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('process.env.NODE_ENV is not set')
  }

  const TerserWebpackPlugin = require('terser-webpack-plugin')

  nodeConfig.mode = 'production'

  if (productionSourcemap) {
    nodeConfig.devtool = 'source-map'
  } else {
    nodeConfig.devtool = false
  }

  nodeConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }))

  nodeConfig.plugins.push(new ForkTsCheckerWebpackPlugin({
    async: false,
    typescript: {
      memoryLimit: 4096,
      configFile: configFile
    }
  }))

  nodeConfig.optimization = {
    ...(nodeConfig.optimization || {}),
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        // sourceMap: productionSourcemap,
        extractComments: false,
        terserOptions: {
          ecma: 2019,
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ]
  }
}

module.exports = nodeConfig
