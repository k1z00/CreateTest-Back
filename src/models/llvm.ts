interface LlvmTestPayload {
  title: string
  source?: string
  counts: number
}

interface LlvmTestAnswer {
  value: string
  isCorrect: boolean
}

interface LlvmTestQuestion {
  text: string
  typeAnswer: 'single' // Тип ответа: одиночный
  answers: LlvmTestAnswer[]
}

interface LlvmTest {
  title: string
  seed: string // Уникальный идентификатор
  source?: string // Источник информации
  counts: number // Количество вопросов
  questions: LlvmTestQuestion[]
}

export type {
  LlvmTest,
  LlvmTestAnswer,
  LlvmTestQuestion,
}

export type {
  LlvmTestPayload,
}
