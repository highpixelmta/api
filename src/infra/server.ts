import PingAPI from '../app'
import { config } from "dotenv"
config();

PingAPI.app.listen({ port: Number(process.env.PORT), host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})