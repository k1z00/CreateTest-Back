import type { LlvmTest } from './llvm'

interface Test extends LlvmTest {
  id: number
}

type TestList = Omit<Test, 'questions' | 'seed'>

export type {
  Test,
  TestList,
}
