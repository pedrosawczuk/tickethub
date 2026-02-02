import fastify from 'fastify';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';

export const app = fastify().withTypeProvider<ZodTypeProvider>();