import { z } from '@hono/zod-openapi'
import { TestSchema } from './test.schema'

const LlvmTestPayloadSchema = z.object({
  title: z.string().openapi({
    description: 'The title of the test payload.',
  }),
  source: z.string().optional().openapi({
    default: 'Любые источники',
    description: 'The source of the test payload, if available.',
  }),
  counts: z.number().openapi({
    default: 5,
    description: 'The number of counts in the test payload.',
  }),
})

const LlvmTestAnswerSchema = z.object({
  value: z.string().openapi({
    description: 'The text of the answer.',
  }),
  isCorrect: z.boolean().openapi({
    description: 'Indicates whether the answer is correct.',
  }),
})

const LlvmTestQuestionSchema = z.object({
  text: z.string().openapi({
    description: 'The text of the question.',
  }),
  typeAnswer: z.enum(['single']).openapi({
    description: 'The type of answer: single.',
  }),
  answers: z.array(LlvmTestAnswerSchema).openapi({
    description: 'The list of possible answers for the question.',
  }),
})

const LlvmTestSchema = z.object({
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

const LlvmTestResponseSchema = z.union([LlvmTestSchema, TestSchema])

export {
  LlvmTestPayloadSchema,
  LlvmTestQuestionSchema,
  LlvmTestResponseSchema,
  LlvmTestSchema,
}
