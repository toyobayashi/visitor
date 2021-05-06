const { compile } = require('./util.js')

async function main () {
  await compile(require('./webpack.config.js'), {
    colors: true,
    children: false,
    modules: false,
    entrypoints: false
  })
}

module.exports = main

if (require.main === module) {
  main()
}
