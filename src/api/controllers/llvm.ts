import { createRoute } from '@hono/zod-openapi'
import AController from '~/api/interfaces/controller.abstract'
import { jwtGuard } from '~/middleware'
import { LlvmTestPayloadSchema, LlvmTestResponseSchema } from '~/models/llvm.schema'
import { LlvmService } from '~/services'

class LlvmController extends AController {
  private service = new LlvmService()

  constructor() {
    super('/llvm')

    this.generateTest()
    this.guestGenerateTest()
  }

  private generateTest = () => {
    const route = createRoute({
      method: 'post',
      path: `${this.path}/generate-test`,
      tags: ['llvm'],
      request: {
        body: {
          content: {
            'application/json': {
              schema: LlvmTestPayloadSchema,
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: LlvmTestResponseSchema,
            },
          },
          description: 'Generate test',
        },
      },
    })

    this.router.use(route.path, jwtGuard)
    this.router.openapi(
      route,
      async (c) => {
        const body = c.req.valid('json')
        const user = c.get('user')
        const data = await this.service.generateTest(body, user)

        return c.json(LlvmTestResponseSchema.parse(data), 200)
      },
    )
  }

  private guestGenerateTest = () => {
    const route = createRoute({
      method: 'post',
      path: `${this.path}/guest-generate-test`,
      tags: ['llvm'],
      request: {
        body: {
          content: {
            'application/json': {
              schema: LlvmTestPayloadSchema,
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: LlvmTestResponseSchema,
            },
          },
          description: 'Generate test',
        },
      },
    })

    this.router.openapi(
      route,
      async (c) => {
        const body = c.req.valid('json')
        const data = await this.service.generateTest(body)

        return c.json(LlvmTestResponseSchema.parse(data), 200)
      },
    )
  }
}

export { LlvmController }
