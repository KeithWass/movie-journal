/*
  Warnings:

  - Added the required column `title` to the `MovieEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieEntry" ADD COLUMN     "title" TEXT NOT NULL;
