import { OpenAPIHono as Hono } from '@hono/zod-openapi'

interface ContextVariables {
  token: string
}

abstract class AController {
  public router = new Hono<{ Variables: ContextVariables }>()

  constructor(public path: string) {
    this.router.basePath(path)
  }
}

export default AController
