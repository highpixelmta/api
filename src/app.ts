import Fastify, { FastifyInstance } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { appRoutes } from './infra/http/routes/routes';
import highpixelConfig from './config/highpixel.config';
import StartBOT from './infra/services/discord/events/interactionCreate';

class HighPixelAPI {
  public app: FastifyInstance;

  constructor() {
    this.app = Fastify();

    this.app.register(fastifyCors, {
      origin: ["*"],
      methods: ['GET', 'POST', 'PUT', 'PATCH'],
      credentials: true,
      logLevel: 'error'
    })

    this.app.register(fastifyJwt, {
      secret: highpixelConfig.Auth.secretKey,
      cookie: {
        cookieName: 'refreshToken',
        signed: false,
      },
      sign: {
        expiresIn: highpixelConfig.Auth.expiresIn,
      },
    });

    this.app.register(fastifyCookie)
    this.app.register(appRoutes);
    new StartBOT();
  }
}


export default new HighPixelAPI();