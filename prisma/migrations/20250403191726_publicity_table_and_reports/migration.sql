/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reports" DROP CONSTRAINT "Reports_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Reports" DROP CONSTRAINT "Reports_userId_fkey";

-- DropTable
DROP TABLE "Log";

-- DropTable
DROP TABLE "Reports";

-- CreateTable
CREATE TABLE "Publicity" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "url" TEXT,
    "photo" TEXT NOT NULL,
    "cape" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publicity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportsNews" (
    "id" SERIAL NOT NULL,
    "idUserReporter" INTEGER NOT NULL,
    "newsId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportsNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportsPublicity" (
    "id" SERIAL NOT NULL,
    "idUserReporter" INTEGER NOT NULL,
    "publicityId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportsPublicity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReportsNews_newsId_idx" ON "ReportsNews"("newsId");

-- CreateIndex
CREATE INDEX "ReportsPublicity_publicityId_idx" ON "ReportsPublicity"("publicityId");

-- AddForeignKey
ALTER TABLE "ReportsNews" ADD CONSTRAINT "ReportsNews_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportsPublicity" ADD CONSTRAINT "ReportsPublicity_publicityId_fkey" FOREIGN KEY ("publicityId") REFERENCES "Publicity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
