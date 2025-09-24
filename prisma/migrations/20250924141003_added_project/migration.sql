-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "public"."project" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT NOT NULL,
    "imageKitId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
