/*
  Warnings:

  - Made the column `event_id` on table `user_attending_status` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attending` on table `user_attending_status` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users"."user_attending_status" ALTER COLUMN "event_id" SET NOT NULL;
ALTER TABLE "users"."user_attending_status" ALTER COLUMN "attending" SET NOT NULL;

-- AlterPrimaryKey
ALTER TABLE "users"."user_attending_status" ALTER PRIMARY KEY USING COLUMNS ("username", "event_id");
