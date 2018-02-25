const NeoPixelServer = require('./src/server')

const server = new NeoPixelServer()
server.listen()

process.on('SIGINT', handleShutdown)
process.on('SIGTERM', handleShutdown)
process.on('exit', handleShutdown)

function handleShutdown() {
  server.shutDown()
  process.exit()
}
