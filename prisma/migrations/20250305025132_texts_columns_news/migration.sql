-- AlterTable
ALTER TABLE "Log" ALTER COLUMN "error" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "News" ALTER COLUMN "argument" SET DATA TYPE TEXT,
ALTER COLUMN "photo1" DROP NOT NULL,
ALTER COLUMN "photo1" SET DATA TYPE TEXT,
ALTER COLUMN "photo2" DROP NOT NULL,
ALTER COLUMN "photo2" SET DATA TYPE TEXT,
ALTER COLUMN "photo3" DROP NOT NULL,
ALTER COLUMN "photo3" SET DATA TYPE TEXT,
ALTER COLUMN "cape" SET DATA TYPE TEXT;
