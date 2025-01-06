/*
  Warnings:

  - Added the required column `authorId` to the `test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "test" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "test_authorId_idx" ON "test"("authorId");
