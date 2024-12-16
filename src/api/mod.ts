import type { OpenAPIHono as Hono } from '@hono/zod-openapi'

import {
  LlvmController,
  TestController,
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
]

export function setupRoutes(server: Hono) {
  controllers.forEach(({ basePath, controller: { router } }) => {
    server.route(basePath, router)
  })
}
