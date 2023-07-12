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
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING(255) NOT NULL,
    "capacity" INT8,
    "location" STRING,
    "start" TIMESTAMPTZ(6),
    "end" TIMESTAMPTZ(6),
    "description" STRING,
    "category" STRING,
    "tags" STRING[],
    "attendees" STRING[],
    "org_id" STRING(32),
    "user_id" STRING(32),

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizers"."organizers" (
    "org_id" STRING(32) NOT NULL,
    "display_name" STRING(64),
    "organizer_description" STRING,
    "pass" STRING(60) NOT NULL,
    "email" STRING(255),
    "phone_number" STRING(13),
    "socials" STRING[],
    "premium" BOOL DEFAULT false,

    CONSTRAINT "organizers_pkey" PRIMARY KEY ("org_id")
);

-- CreateTable
CREATE TABLE "users"."user_attending_status" (
    "username" STRING(32) NOT NULL,
    "event_id" UUID,
    "attending" "users"."attending_status_type",

    CONSTRAINT "user_attending_status_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "users"."users" (
    "username" STRING(32) NOT NULL,
    "pass" STRING(60) NOT NULL,
    "email" STRING(255) NOT NULL,
    "phone_number" STRING(15),
    "socials" STRING[],
    "premium" BOOL DEFAULT false,
    "interests" STRING[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "users"."Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "organizersOrg_id" STRING(32),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,
    "organizersOrg_id" STRING(32),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_unique_event" ON "experiences"."experiences"("name", "org_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_unique_user" ON "experiences"."experiences"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizers_email_key" ON "organizers"."organizers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizers_phone_number_key" ON "organizers"."organizers"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"."users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "users"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "users"."Account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "experiences"."experiences" ADD CONSTRAINT "experiences_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizers"."organizers"("org_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "experiences"."experiences" ADD CONSTRAINT "experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users"."user_attending_status" ADD CONSTRAINT "user_attending_status_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "experiences"."experiences"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users"."user_attending_status" ADD CONSTRAINT "user_attending_status_username_fkey" FOREIGN KEY ("username") REFERENCES "users"."users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"."users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Session" ADD CONSTRAINT "Session_organizersOrg_id_fkey" FOREIGN KEY ("organizersOrg_id") REFERENCES "organizers"."organizers"("org_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"."users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Account" ADD CONSTRAINT "Account_organizersOrg_id_fkey" FOREIGN KEY ("organizersOrg_id") REFERENCES "organizers"."organizers"("org_id") ON DELETE SET NULL ON UPDATE CASCADE;
