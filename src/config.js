const fs = require('fs')
const path = require('path')

const configPath = path.join(__dirname, '..', './config.js')
if (!fs.existsSync(configPath)) {
  throw new Error(`Missing "config.js"`)
}

module.exports = require(configPath)
