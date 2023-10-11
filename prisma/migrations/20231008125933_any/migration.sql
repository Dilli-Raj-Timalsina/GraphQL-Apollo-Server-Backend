-- AlterTable
ALTER TABLE "users" ALTER COLUMN "salt" DROP NOT NULL,
ALTER COLUMN "profile_image_url" DROP NOT NULL;
