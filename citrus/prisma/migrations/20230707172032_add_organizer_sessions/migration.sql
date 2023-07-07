-- AlterTable
ALTER TABLE "users"."Account" ADD COLUMN     "organizersOrg_id" STRING;

-- AlterTable
ALTER TABLE "users"."Session" ADD COLUMN     "organizersOrg_id" STRING;

-- AddForeignKey
ALTER TABLE "users"."Session" ADD CONSTRAINT "Session_organizersOrg_id_fkey" FOREIGN KEY ("organizersOrg_id") REFERENCES "organizers"."organizers"("org_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."Account" ADD CONSTRAINT "Account_organizersOrg_id_fkey" FOREIGN KEY ("organizersOrg_id") REFERENCES "organizers"."organizers"("org_id") ON DELETE SET NULL ON UPDATE CASCADE;
