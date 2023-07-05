-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "experiences";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "organizers";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateEnum
CREATE TYPE "users"."attending_status_type" AS ENUM ('attending', 'attended', 'interested');

-- CreateTable
CREATE TABLE "experiences"."experiences" (
    "event_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_name" STRING NOT NULL,
    "capacity" INT8,
    "event_location" STRING,
    "event_start" TIMESTAMPTZ(6),
    "event_end" TIMESTAMPTZ(6),
    "event_description" STRING,
    "category" STRING,
    "tags" STRING[],
    "attendees" STRING[],
    "org_id" STRING,
    "user_id" STRING,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "organizers"."organizers" (
    "org_id" STRING NOT NULL,
    "display_name" STRING,
    "organizer_description" STRING,
    "pass" STRING NOT NULL,
    "email" STRING,
    "phone_number" STRING,
    "socials" STRING[],
    "premium" BOOL DEFAULT false,

    CONSTRAINT "organizers_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "users"."user_attending_status" (
    "username" STRING NOT NULL,
    "event_id" UUID,
    "attending" "users"."attending_status_type",

    CONSTRAINT "user_attending_status_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "users"."users" (
    "username" STRING NOT NULL,
    "pass" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone_number" STRING,
    "socials" STRING[],
    "premium" BOOL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_unique" ON "experiences"."experiences"("event_name", "org_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizers_email_key" ON "organizers"."organizers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizers_phone_number_key" ON "organizers"."organizers"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"."users"("phone_number");

-- AddForeignKey
ALTER TABLE "experiences"."experiences" ADD CONSTRAINT "experiences_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizers"."organizers"("org_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "experiences"."experiences" ADD CONSTRAINT "experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users"."user_attending_status" ADD CONSTRAINT "user_attending_status_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "experiences"."experiences"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users"."user_attending_status" ADD CONSTRAINT "user_attending_status_username_fkey" FOREIGN KEY ("username") REFERENCES "users"."users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;
