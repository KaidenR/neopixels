const NeoPixels = require('./neoPixels')
const Color = require('./neoPixels/color')

const neoPixels = new NeoPixels()
// neoPixels.sayHello()
// neoPixels.setBrightness(50)

// neoPixels.fill(Color('blue'))

setTimeout(() => neoPixels.sayHello(), 2000)


// Bottom: 0 - 68
// Right: 69 - 87
// Top: 88 - 157
// Left 157 - 177


// // Show ruler
// neoPixels.setBrightness(50)
// let color = new Color.rgb(0,0,5)
// for(let i = 0; i < neoPixels.channel.count; i += 10) {
//   neoPixels.strip.setRange(i - 1, i, color)
// }
// neoPixels.render(neoPixels.strip)


// // Color sides
// neoPixels.setBrightness(50)
// neoPixels.render(neoPixels.strip
//   .setRange(0, 69, Color('red'))
//   .setRange(69, 88, Color('green'))
//   .setRange(88, 158, Color('blue'))
//   .setRange(158, 177, Color('orange'))
// )


// let i = 0
// const interval = setInterval(() => {
//   // if(i > 0)
//   //   neoPixels.strip.setBlock(i - 1, 1, Color.rgbw(0,0,0,255))
//   neoPixels.render(neoPixels.strip
//     .fill(Color.rgbw(0,0,0,255))
//     .setBlock(i, 1, Color.rgb(0,244,0))
//   )
//   i++
//
//   if (i > neoPixels.channel.count)
//     clearInterval(interval)
// }, 1000 / 177)
