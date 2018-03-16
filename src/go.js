const NeoPixels = require('./neoPixels')
const Color = require('./neoPixels/color')

const neoPixels = new NeoPixels()

let color = new Color(0,0,5,0)

// neoPixels.render(neoPixels.strip
//   .setRange(0, 5, new Color(255,0,0,0))
//   .setRange(6,10, new Color(0,255,0,0))
// )

// neoPixels.render(neoPixels.strip.clear())
// neoPixels.fill(color)
// neoPixels.setBrightness(100)

// neoPixels.rainbow()

// neoPixels.setBrightness(100)
// let color = new Color(40,0,0,100)
// neoPixels.render(neoPixels.strip
//   .clear()
  // .setRange(50, 140, color)
  // .setRange(140, 217, color)
// )


// let i = 0;
//
// setInterval(() => {
//   neoPixels.render(neoPixels.strip.setRange(i, i + 1, color))
//   i = (i + 1) % neoPixels.channel.count
// }, 50)

// let color = new Color(0,0,5,0)
// for(let i = 0; i < neoPixels.channel.count; i += 10) {
//   neoPixels.strip.setRange(i - 1, i, color)
// }
// neoPixels.render(neoPixels.strip)

// neoPixels.setBrightness(100)
// neoPixels.rainbow()