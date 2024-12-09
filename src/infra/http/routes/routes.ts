import { FastifyInstance } from 'fastify'
import { RegisterUser } from '../controllers/auth/register-user'

export async function appRoutes(app: FastifyInstance) {
  app.get('/', RegisterUser)
}