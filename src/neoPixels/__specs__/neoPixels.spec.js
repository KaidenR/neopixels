const ws281x = require('rpi-ws281x-native')

const NeoPixels = require('../index')

describe('neoPixels', () => {
  describe('setBrightness()', () => {
    it('sets the strip brightness', async () => {
      const neoPixels = new NeoPixels()

      neoPixels.setBrightness(40)

      expect(neoPixels.channel.brightness).toBe(102)
      expect(ws281x.render).toHaveBeenCalled()
    })
  })
})