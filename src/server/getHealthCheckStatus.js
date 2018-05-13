const os = require('os-utils')

module.exports = async function() {
  return {
    systemUptime: os.sysUptime(),
    processUptime: os.processUptime(),
    freeMemory: os.freemem(),
    memUsage: os.freememPercentage(),
    cpuUsage: await getCpuUsage()
  }
}

async function getCpuUsage() {
  return new Promise(os.cpuUsage)
}