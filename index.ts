import Fastify from 'fastify'

import todoRoutes from './todoRoutes.js';

const fastify = Fastify({
  logger: true
})

fastify.register(todoRoutes);

const start = async () => {
	try {
  		await fastify.listen({ port: 3000 })
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
