-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('AiGenerate');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_permission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "permission" "Permission" NOT NULL,

    CONSTRAINT "user_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT,
    "seed" TEXT NOT NULL,
    "counts" INTEGER NOT NULL,
    "questions" JSONB NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_permission_id_key" ON "user_permission"("id");

-- CreateIndex
CREATE INDEX "user_permission_userId_idx" ON "user_permission"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "test_id_key" ON "test"("id");
