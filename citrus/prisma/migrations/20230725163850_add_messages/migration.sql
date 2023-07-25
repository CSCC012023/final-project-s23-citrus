-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "messages";

-- CreateTable
CREATE TABLE "messages"."Message" (
    "id" STRING NOT NULL,
    "text" STRING(1000) NOT NULL,
    "user_id" STRING(32) NOT NULL,
    "group_id" STRING(32) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages"."Group" (
    "id" STRING NOT NULL,
    "name" STRING(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages"."_GroupTousers" (
    "A" STRING NOT NULL,
    "B" STRING(32) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupTousers_AB_unique" ON "messages"."_GroupTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupTousers_B_index" ON "messages"."_GroupTousers"("B");

-- AddForeignKey
ALTER TABLE "messages"."Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"."users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages"."Message" ADD CONSTRAINT "Message_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "messages"."Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages"."_GroupTousers" ADD CONSTRAINT "_GroupTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "messages"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages"."_GroupTousers" ADD CONSTRAINT "_GroupTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"."users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
