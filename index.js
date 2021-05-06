console.log('Load dotenv')
require('dotenv').config()

const server = require('./api/index.js')

server.listen(3000)
