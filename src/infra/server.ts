import HighPixelAPI from '../app'
import highpixelConfig from '../config/highpixel.config'

HighPixelAPI.app.listen({ port: highpixelConfig.port }, function (err, adress) {
  if (err) {
    HighPixelAPI.app.log.error(err)
    process.exit(1)
  }
  console.log(`HTTP server running in: ${adress}`)
})