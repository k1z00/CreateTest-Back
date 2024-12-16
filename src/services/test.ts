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

  getTestList = async (page: number, limit: number) => {
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
        }),
        prisma.test.count(),
      ])

      return { data, total }
    }
    catch {
      throw new HTTPException(400, { message: 'Failed to retrieve test list.' })
    }
  }
}

export { TestService }
