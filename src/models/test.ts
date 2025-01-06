import type { LlvmTest } from './llvm'

interface Test extends LlvmTest {
  id: number
  authorId: number
}

type TestList = Omit<Test, 'questions' | 'seed'>

interface PassedTest {
  id: number
  testId: number
  userId: number
  answers: {
    questionIndex: number
    answerIndex: string | number | number[]
  }[]
  createdAt?: Date
}

interface UserPassedTestList {
  id: number
  createdAt: Date
  test: TestList
}

type SavePassedTest = Omit<PassedTest, 'id'>

export type {
  PassedTest,
  SavePassedTest,
  Test,
  TestList,
  UserPassedTestList,
}
