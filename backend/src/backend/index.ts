import { Elysia } from 'elysia';
import { authRoutes } from './auth';
import { characterRoutes } from './characters';
import { conversationRoutes } from './conversations';
import { cors } from '@elysiajs/cors';

const app = new Elysia()
.use(cors())
.use(authRoutes)
.use(characterRoutes)
.use(conversationRoutes)
.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);


// /workspaces/charecterAi/backend/src/backend/src/index.tsbackend