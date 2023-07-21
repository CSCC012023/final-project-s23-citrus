/*
  Warnings:

  - Made the column `capacity` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `experiences` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "experiences"."experiences" ALTER COLUMN "capacity" SET NOT NULL;
ALTER TABLE "experiences"."experiences" ALTER COLUMN "location" SET NOT NULL;
ALTER TABLE "experiences"."experiences" ALTER COLUMN "start" SET NOT NULL;
ALTER TABLE "experiences"."experiences" ALTER COLUMN "end" SET NOT NULL;
ALTER TABLE "experiences"."experiences" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "experiences"."experiences" ALTER COLUMN "category" SET NOT NULL;
