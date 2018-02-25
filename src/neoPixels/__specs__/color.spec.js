const Color = require('../color')

describe('color', () => {
  describe('fromHueAndSaturation()', () => {
    it('returns a color with the correct rgbw', async () => {
      const actual = Color.fromHueAndSaturation(1, 1)
      expect(actual.decimal).toBe(0)
    })
  })
})