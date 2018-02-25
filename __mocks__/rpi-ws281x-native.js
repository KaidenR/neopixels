const mock = jest.fn().mockImplementation(() => {
  return { brightness: 0 }
})
mock.render = jest.fn()
mock.setBrightness = jest.fn()

module.exports = mock