import type { SavePassedTest } from '~/models/test'
import type { User } from '~/models/user'
import { HTTPException } from 'hono/http-exception'
import { prisma } from '~/prisma'

class TestService {
  getTestById = async (id: number) => {
    try {
      const data = await prisma.test.findFirst({
        where: {
          id,
        },
      })

      if (!data) {
        throw new HTTPException(404, { message: `Not find test with id ${id}.` })
      }

      return data
    }
    catch {
      throw new HTTPException(400, { message: `Failed to find test by id ${id}.` })
    }
  }

  getTestList = async (page: number, limit: number, user?: User) => {
    try {
      const skip = (page - 1) * limit

      const [data, total] = await Promise.all([
        prisma.test.findMany({
          skip,
          take: limit,
          select: {
            id: true,
            title: true,
            source: true,
            counts: true,
          },
          ...(user
            ? {
                where: {
                  authorId: user.id,
                },
              }
            : {}
          ),
        }),
        prisma.test.count(),
      ])

      return { data, total }
    }
    catch {
      throw new HTTPException(400, { message: 'Failed to retrieve test list.' })
    }
  }

  getUserPassedTestList = async (page: number, limit: number, userId: number) => {
    try {
      const skip = (page - 1) * limit

      const [data, total] = await Promise.all([
        prisma.passedTest.findMany({
          skip,
          take: limit,
          select: {
            id: true,
            createdAt: true,
            Test: {
              select: {
                id: true,
                title: true,
                source: true,
                counts: true,
              },
            },
          },
          where: {
            userId,
          },
        }),
        prisma.passedTest.count({ where: { userId } }),
      ])

      const transformedData = data.map(({ Test, ...rest }) => ({ ...rest, test: Test }))

      return { data: transformedData, total }
    }
    catch {
      throw new HTTPException(400, { message: 'Failed to retrieve passed test list.' })
    }
  }

  savePassedTest = async (payload: SavePassedTest) => {
    try {
      const data = await prisma.passedTest.create({
        data: payload,
      })

      return data.id
    }
    catch {
      throw new HTTPException(400, { message: 'Failed to save passed test.' })
    }
  }
}

export { TestService }
