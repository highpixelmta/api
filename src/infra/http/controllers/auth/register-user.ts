import { FastifyReply, FastifyRequest } from 'fastify'

export async function RegisterUser(_: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send("opa");
}