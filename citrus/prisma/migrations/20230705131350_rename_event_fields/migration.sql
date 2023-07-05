/*
  Warnings:

  - You are about to drop the column `event_description` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `event_end` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `event_location` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `event_name` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `event_start` on the `experiences` table. All the data in the column will be lost.
  - Added the required column `name` to the `experiences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users"."user_attending_status" DROP CONSTRAINT "user_attending_status_event_id_fkey";

-- RedefineTables
CREATE TABLE "experiences"."_prisma_new_experiences" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "capacity" INT8,
    "location" STRING,
    "start" TIMESTAMPTZ(6),
    "end" TIMESTAMPTZ(6),
    "description" STRING,
    "category" STRING,
    "tags" STRING[],
    "attendees" STRING[],
    "org_id" STRING,
    "user_id" STRING,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);
DROP INDEX "experiences"."event_unique";
INSERT INTO "experiences"."_prisma_new_experiences" ("attendees","capacity","category","org_id","tags","user_id") SELECT "attendees","capacity","category","org_id","tags","user_id" FROM "experiences"."experiences";
DROP TABLE "experiences"."experiences" CASCADE;
ALTER TABLE "experiences"."_prisma_new_experiences" RENAME TO "experiences";
CREATE UNIQUE INDEX "event_unique" ON "experiences"."experiences"("name", "org_id", "user_id");
ALTER TABLE "experiences"."experiences" ADD CONSTRAINT "experiences_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizers"."organizers"("org_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "experiences"."experiences" ADD CONSTRAINT "experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users"."user_attending_status" ADD CONSTRAINT "user_attending_status_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "experiences"."experiences"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
