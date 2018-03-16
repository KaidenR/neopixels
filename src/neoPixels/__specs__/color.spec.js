const Color = require('../color')

describe('Color', () => {
  describe('rgb()', () => {
    it('returns a color with the correct rgb', async () => {
      let actual = Color.rgb(10, 20, 30).rgb().color
      let expected = [10, 20, 30]

      expect(actual).toEqual(expected)
    })
  })

  describe('hsl()', () => {
    it('returns the correct color', async () => {
      let actual = Color.hsl(0,100,50).rgb().color
      let expected = [255,0,0]
      expect(actual).toEqual(expected)
    })
  })

  describe('rgbwObject()', () => {
    it('returns a color with the correct rgbw values', async () => {
      let actual = Color.rgb(10, 20, 30).rgbwObject()
      let expected = { r: 10, g: 20, b: 30, w: 0 }

      expect(actual).toEqual(expected)
    })

    it('returns a white if all the colors are the same', async () => {
      let actual = Color.rgb(10, 10, 10).rgbwObject()
      let expected = { r: 0, g: 0, b: 0, w: 10 }

      expect(actual).toEqual(expected)
    })

    it('returns the a color with the correct rgbw values when the object was created as an rgbw', async () => {
      let actual = Color.rgbw(10, 20, 30, 40).rgbwObject()
      let expected = { r: 10, g: 20, b: 30, w: 40 }

      expect(actual).toEqual(expected)
    })
  })

  describe('rgbwNumber()', () => {
    it('returns the correct number', async () => {
      expect(Color.rgb(0, 0, 0).rgbwNumber()).toEqual(0)
      expect(Color.rgb(0, 0, 10).rgbwNumber()).toEqual(10)
      expect(Color.rgb(10, 0, 0).rgbwNumber()).toEqual(2560)
      expect(Color.rgb(0, 10, 0).rgbwNumber()).toEqual(655360)
    })

    it('returns the correct rgb number for colors created using hsl', async () => {
      expect(Color.hsl(0,100,2).rgbwNumber()).toEqual(2560)
    })

    it('returns a white if all the colors are the same', async () => {
      expect(Color.hsl(0,0,50).rgbwNumber()).toEqual(2130706432)
    })
  })
})