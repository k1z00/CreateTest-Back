import { createRoute } from '@hono/zod-openapi'
import AController from '~/api/interfaces/controller.abstract'
import { LlvmTestPayloadSchema } from '~/models/llvm.schema'
import { TestSchema } from '~/models/test.schema'
import { LlvmService } from '~/services'

class LlvmController extends AController {
  private service = new LlvmService()

  constructor() {
    super('/llvm')

    this.generateTest()
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
              schema: TestSchema,
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

        return c.json(TestSchema.parse(data), 200)
      },
    )
  }
}

export { LlvmController }
