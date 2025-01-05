import type { OpenAPIHono as Hono } from '@hono/zod-openapi'

import {
  AuthController,
  LlvmController,
  TestController,
  UserController,
} from './controllers'

const controllers = [
  {
    basePath: '/api/v1',
    controller: new LlvmController(),
  },
  {
    basePath: '/api/v1',
    controller: new TestController(),
  },
  {
    basePath: '/api/v1',
    controller: new AuthController(),
  },
  {
    basePath: '/api/v1',
    controller: new UserController(),
  },
]

export function setupRoutes(server: Hono) {
  controllers.forEach(({ basePath, controller: { router } }) => {
    server.route(basePath, router)
  })
}
