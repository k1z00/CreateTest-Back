import { z } from '@hono/zod-openapi'
import { LlvmTestQuestionSchema } from './llvm.schema'

const TestSchema = z.object({
  id: z.number().openapi({
    description: 'Database identifier.',
  }),
  title: z.string().openapi({
    description: 'The title of the test.',
  }),
  seed: z.string().openapi({
    description: 'A unique identifier for the test.',
  }),
  source: z.string().optional().openapi({
    description: 'The source of the test information, if available.',
  }),
  questions: z.array(LlvmTestQuestionSchema).openapi({
    description: 'The list of questions in the test.',
  }),
  counts: z.number().openapi({
    description: 'The number of questions in the test.',
  }),
})

const TestListSchema = z.object({
  id: z.number().openapi({
    description: 'Database identifier.',
  }),
  title: z.string().openapi({
    description: 'The title of the test.',
  }),
  source: z.string().optional().openapi({
    description: 'The source of the test information, if available.',
  }),
  counts: z.number().openapi({
    description: 'The number of questions in the test.',
  }),
})

export {
  TestListSchema,
  TestSchema,
}
