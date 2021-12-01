/*
  Warnings:

  - Added the required column `details` to the `timeline_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timeline_entries" ADD COLUMN     "details" TEXT NOT NULL;
