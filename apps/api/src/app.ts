import fastify from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export const app = fastify({logger: true}).withTypeProvider<ZodTypeProvider>();