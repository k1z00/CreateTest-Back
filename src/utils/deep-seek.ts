import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1/',
  apiKey: process.env.DEEP_SEEK_KEY,
})
function createAiRequest(systemPromt: string, userPromt: string) {
  return openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPromt },
      { role: 'user', content: userPromt },
    ],
    model: 'deepseek-chat',
    response_format: {
      type: 'json_object',
    },
    stream: false,
    temperature: 2,
  })
}

export { createAiRequest, openai }
