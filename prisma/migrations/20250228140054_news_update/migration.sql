/*
  Warnings:

  - You are about to drop the column `cover` on the `News` table. All the data in the column will be lost.
  - Added the required column `cape` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "cover",
ADD COLUMN     "aiValidate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cape" VARCHAR(255) NOT NULL,
ADD COLUMN     "minReads" INTEGER;
