/*
  Warnings:

  - You are about to drop the column `Voucherid` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_Voucherid_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "Voucherid",
ADD COLUMN     "voucherid" INTEGER;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_voucherid_fkey" FOREIGN KEY ("voucherid") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
