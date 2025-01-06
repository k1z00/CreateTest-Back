import type { LlvmTestPayload } from '~/models/llvm'
import type { User } from '~/models/user'
import { HTTPException } from 'hono/http-exception'
import { LlvmTestSchema } from '~/models/llvm.schema'
import { prisma } from '~/prisma'
import { createAiRequest } from '~/utils/deep-seek'
import { getPromt } from '~/utils/promt'

class LlvmService {
  generateTest = async (params: LlvmTestPayload, user?: User) => {
    const { system: systemPromt, user: userPromt } = getPromt(params)

    const response = await createAiRequest(systemPromt, userPromt)
    const rawData = response.choices[0].message.content

    try {
      if (!rawData)
        throw new Error('Failed to generate content.')

      const data = JSON.parse(rawData)
      const validatedData = LlvmTestSchema.parse(data)

      if (user) {
        const responseData = await prisma.test.create({
          data: {
            authorId: user.id,
            ...validatedData,
          },
        })

        return responseData
      }

      return validatedData
    }
    catch {
      throw new HTTPException(400, { message: 'Failed to generate content.' })
    }
  }
}

export { LlvmService }
