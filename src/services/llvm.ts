import type { LlvmTestPayload } from '~/models/llvm'
import { HTTPException } from 'hono/http-exception'
import { LlvmTestSchema } from '~/models/llvm.schema'
import { prisma } from '~/prisma'
import { createAiRequest } from '~/utils/deep-seek'
import { getPromt } from '~/utils/promt'

class LlvmService {
  generateTest = async (params: LlvmTestPayload) => {
    const { system, user } = getPromt(params)

    const response = await createAiRequest(system, user)
    const rawData = response.choices[0].message.content

    try {
      if (!rawData)
        throw new Error('Failed to generate content.')

      const data = JSON.parse(rawData)
      const validatedData = LlvmTestSchema.parse(data)

      const responseData = await prisma.test.create({
        data: validatedData,
      })

      return responseData
    }
    catch {
      throw new HTTPException(400, { message: 'Failed to generate content.' })
    }
  }
}

export { LlvmService }
