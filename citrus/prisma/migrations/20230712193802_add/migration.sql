/*
  Warnings:

  - You are about to drop the column `socials` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users"."users" DROP COLUMN "socials";
ALTER TABLE "users"."users" ADD COLUMN     "facebook" STRING;
ALTER TABLE "users"."users" ADD COLUMN     "instagram" STRING;
