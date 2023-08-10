-- CreateTable
CREATE TABLE "users"."Follows" (
    "follower_username" STRING(32) NOT NULL,
    "following_username" STRING(32) NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("follower_username","following_username")
);

-- AddForeignKey
ALTER TABLE "users"."Follows" ADD CONSTRAINT "Follows_follower_username_fkey" FOREIGN KEY ("follower_username") REFERENCES "users"."users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users"."Follows" ADD CONSTRAINT "Follows_following_username_fkey" FOREIGN KEY ("following_username") REFERENCES "users"."users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;
