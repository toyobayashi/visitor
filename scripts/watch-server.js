const webpack = require('webpack')

function watch (config, handler) {
  const compiler = webpack(config)
  compiler.watch({
    aggregateTimeout: 200,
    poll: undefined
  }, handler)
  return compiler
}

const watchConfig = (webpackConf) => watch(webpackConf, function watchHandler (err, stats) {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats.toString({
    colors: true,
    children: false,
    modules: false,
    entrypoints: false
  }) + '\n')
})

watchConfig(require('./webpack.config.js'))
