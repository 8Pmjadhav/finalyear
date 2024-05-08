-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image_id" VARCHAR(199),
ADD COLUMN     "video_id" VARCHAR(199);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_id" VARCHAR(199),
ADD COLUMN     "backcover_id" VARCHAR(199);
