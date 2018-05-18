const fs = require('fs')
const path = require('path')

const configPath = path.join(__dirname, '..', './config.js')
if (!fs.existsSync(configPath)) {
  throw new Error(`Missing "config.js"`)
}

console.log('requiring', configPath)
module.exports = require(configPath)

console.log('exported', module.exports)