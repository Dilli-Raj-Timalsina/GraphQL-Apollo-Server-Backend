/*
  Warnings:

  - You are about to drop the `OutputBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OutputBook" DROP CONSTRAINT "OutputBook_courseId_fkey";

-- DropTable
DROP TABLE "OutputBook";
