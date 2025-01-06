import { z } from '@hono/zod-openapi'

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

const PassedTestSchema = z.object({
  id: z.number().openapi({
    description: 'Unique identifier for the passed test record.',
  }),
  testId: z.number().openapi({
    description: 'Identifier of the test that was passed.',
  }),
  userId: z.number().openapi({
    description: 'Identifier of the user who passed the test.',
  }),
  answers: z.array(
    z.object({
      questionIndex: z.number().openapi({
        description: 'Index of the question in the test.',
      }),
      answerIndex: z.union([
        z.string(),
        z.number(),
        z.array(z.number()),
      ]).openapi({
        description: 'Index or indices of the selected answer(s).',
      }),
    }),
  ).openapi({
    description: 'List of answers provided by the user for the test questions.',
  }),
})

const UserPassedTestListSchema = z.object({
  id: z.number().openapi({
    description: 'Database identifier.',
  }),
  createdAt: z.date(),
  test: TestListSchema,
})

export {
  PassedTestSchema,
  TestListSchema,
  TestSchema,
  UserPassedTestListSchema,
}
