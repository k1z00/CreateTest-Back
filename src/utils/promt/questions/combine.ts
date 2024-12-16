import type { LlvmTestPayload } from '~/models/llvm'

import { v4 } from 'uuid'
import singleFilledJSON from './jsons/single-filled.json'
import { modelDescription } from './model-description'

const templatesFilled: Record<'single', unknown> = {
  single: singleFilledJSON,
}

function getPromt(params: LlvmTestPayload) {
  const exampleOutput = templatesFilled.single

  const system = `
  Ты — помощник для создания тестов в формате JSON.
  Твоя задача — сгенерировать тест на основе заданной темы, используя уникальные источники и seed для обеспечения разнообразия вопросов.
  Каждый вопрос должен быть уникальным и не повторяться между тестами и вопросами.
  Количество вопросов, которое должно быть сгенерировано в тесте: ${params.counts} (должно совпадать с количеством указаном в итоговом json поля **counts**).

  ПРИМЕР ВХОДНЫХ ДАННЫХ:
  \`\`\`json
  {
    "title": "История Древнего Рима",
    "seed": "123456789",
    "source": "Исторические источники и учебники по древнеримской истории",
    "counts": 5
  }
  \`\`\`

  ПРИМЕР ВЫВОДА JSON:
  \`\`\`json
  ${JSON.stringify(exampleOutput)}
  \`\`\`

  ОПИСАНИЕ МОДЕЛИ ДАННЫХ:
  ${modelDescription}

  ФОРМАТ ОТВЕТА:
  Вывод должен быть валидным JSON. Отвечай исключительно на Русском языке.
  `

  const user = `
  ${JSON.stringify({
    ...params,
    seed: v4(),
  })}
  `

  return { system, user }
}

export {
  getPromt,
  templatesFilled,
}
