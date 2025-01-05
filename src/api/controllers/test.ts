import { createRoute, z } from '@hono/zod-openapi'
import AController from '~/api/interfaces/controller.abstract'
import { jwtGuard } from '~/middleware'
import { DataListSchema, PageLimitSchema, PageSchema } from '~/models/shared.schema'
import { TestListSchema, TestSchema, UserPassedTestListSchema } from '~/models/test.schema'
import { TestService } from '~/services'

class TestController extends AController {
  private service = new TestService()

  constructor() {
    super('/test')

    this.getTestList()
    this.getUserPassedTestList()
    this.getTest()
    this.savePassedTest()
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
          page: PageSchema,
          limit: PageLimitSchema,
        }),
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: DataListSchema(TestListSchema),
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

  private getUserPassedTestList = () => {
    const route = createRoute({
      method: 'get',
      path: `${this.path}/my-passed-list`,
      tags: ['test'],
      request: {
        query: z.object({
          page: PageSchema,
          limit: PageLimitSchema,
        }),
        headers: z.object({ 'x-authorizaition': z.string() }),
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: DataListSchema(UserPassedTestListSchema),
            },
          },
          description: 'Retrieve list of passed tests with pagination',
        },
      },
    })

    this.router.use(route.path, jwtGuard)
    this.router.openapi(
      route,
      async (c) => {
        const { page, limit } = c.req.valid('query')
        const user = c.get('user')

        const { data, total } = await this.service.getUserPassedTestList(page, limit, user.id)

        return c.json(
          {
            data: z.array(UserPassedTestListSchema).parse(data),
            pagination: {
              page,
              limit,
              total,
            },
          },
        )
      },
    )
  }

  private savePassedTest = () => {
    const route = createRoute({
      method: 'post',
      path: `${this.path}/save-passed`,
      tags: ['test'],
      request: {
        body: {
          content: {
            'application/json': {
              schema: z.object({
                testId: z.number(),
                answers: z.object({
                  questionIndex: z.number(),
                  answerIndex: z.union([z.number(), z.array(z.number()), z.string()]),
                }).array(),
              }),
            },
          },
        },
        headers: z.object({ 'x-authorizaition': z.string() }),
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: z.number(),
            },
          },
          description: 'ID for passed test',
        },
      },
    })

    this.router.use(route.path, jwtGuard)
    this.router.openapi(
      route,
      async (c) => {
        const body = c.req.valid('json')
        const user = c.get('user')

        const data = await this.service.savePassedTest({ userId: user.id, ...body })

        return c.json(z.number().parse(data), 200)
      },
    )
  }
}

export { TestController }
