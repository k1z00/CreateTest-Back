-- CreateTable
CREATE TABLE "passed_test" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passed_test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passed_test_id_key" ON "passed_test"("id");

-- CreateIndex
CREATE INDEX "passed_test_testId_idx" ON "passed_test"("testId");

-- CreateIndex
CREATE INDEX "passed_test_userId_idx" ON "passed_test"("userId");
