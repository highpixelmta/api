import HighPixelAPI from '../app';
import { config } from "dotenv";
config();
import highpixelConfig from "../config/highpixel.config";


HighPixelAPI.app.listen({ port: highpixelConfig.port, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP server running`);
}).catch((err) => {
  console.error("Erro ao iniciar o servidor HTTP:", err);
});
