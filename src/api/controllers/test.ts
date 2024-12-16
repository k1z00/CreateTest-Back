import { createRoute, z } from '@hono/zod-openapi'
import AController from '~/api/interfaces/controller.abstract'
import { TestListSchema, TestSchema } from '~/models/test.schema'
import { TestService } from '~/services'

class TestController extends AController {
  private service = new TestService()

  constructor() {
    super('/test')

    this.getTestList()
    this.getTest()
  }

  private getTest = () => {
    const route = createRoute({
      method: 'get',
      path: `${this.path}/{id}`,
      tags: ['test'],
      request: {
        params: z.object({
          id: z.string()
            .default('')
            .transform(val => Number.parseInt(val, 10))
            .refine(val => !Number.isNaN(val) && val > 0, { message: 'Invalid id for test' })
            .openapi({
              param: {
                name: 'id',
                in: 'path',
              },
            }),
        }),
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: TestSchema,
            },
          },
          description: 'Retrieve test by id',
        },
      },
    })

    this.router.openapi(
      route,
      async (c) => {
        const { id } = c.req.valid('param')
        const data = await this.service.getTestById(id)

        return c.json(TestSchema.parse(data), 200)
      },
    )
  }

  private getTestList = () => {
    const route = createRoute({
      method: 'get',
      path: `${this.path}/list`,
      tags: ['test'],
      request: {
        query: z.object({
          page: z
            .string()
            .default('1')
            .transform(val => Number.parseInt(val, 10))
            .refine(val => !Number.isNaN(val) && val > 0, { message: 'Invalid value for page' })
            .openapi({
              param: {
                name: 'page',
                in: 'query',
              },
            }),
          limit: z
            .string()
            .default('10')
            .transform(val => Number.parseInt(val, 10))
            .refine(val => !Number.isNaN(val) && val > 0, { message: 'Invalid value for limit' })
            .openapi({
              param: {
                name: 'limit',
                in: 'query',
              },
            }),
        }),
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: z.object({
                data: z.array(TestListSchema),
                pagination: z.object({
                  page: z.number(),
                  limit: z.number(),
                  total: z.number(),
                }),
              }),
            },
          },
          description: 'Retrieve list of tests with pagination',
        },
      },
    })

    this.router.openapi(
      route,
      async (c) => {
        const { page, limit } = c.req.valid('query')
        const { data, total } = await this.service.getTestList(page, limit)

        return c.json(
          {
            data: z.array(TestListSchema).parse(data),
            pagination: {
              page,
              limit,
              total,
            },
          },
          200,
        )
      },
    )
  }
}

export { TestController }
