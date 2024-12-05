import { FastifyInstance } from 'fastify'

export const userRoutes = async function (fastify: FastifyInstance) {
  fastify.get('/', async (req, res) => {
    return res.status(200).send({ message: "hello world" })
  })
}
