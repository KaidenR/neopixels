const request = require('supertest')

const NeoPixelServer = require('../index')
const NeoPixels = require('../../neoPixels')

jest.mock('../../neoPixels')

describe('server', () => {
  function mockRequest() {
    return request(new NeoPixelServer().app)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('/on/:value', () => {
    it('turns the neoPixels on if called with true', async () => {
      const response = await mockRequest().post('/on/true')

      const neoPixels = NeoPixels.mock.instances[0]
      expect(neoPixels.turnOn).toHaveBeenCalled()

      expect(response.status).toBe(200)
    })

    it('turns the neoPixels off if called with false', async () => {
      const response = await mockRequest().post('/on/false')

      const neoPixels = NeoPixels.mock.instances[0]
      expect(neoPixels.turnOff).toHaveBeenCalled()

      expect(response.status).toBe(200)
    })
  })

  describe('/brightness/:value', () => {
    it(`sets the neoPixel's brightness`, async () => {
      const response = await mockRequest().post('/brightness/10')

      expect(NeoPixels.mock.instances[0].setBrightness).toHaveBeenCalledWith(10)
      expect(response.status).toBe(200)
    })
  })

})