/*
  Warnings:

  - You are about to alter the column `image` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `video` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `content` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(555)`.
  - You are about to alter the column `refreshToken` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "image" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "video" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "content" SET DATA TYPE VARCHAR(555);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "backgroundImage" VARCHAR(255),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "profileImage" VARCHAR(255),
ALTER COLUMN "refreshToken" SET DATA TYPE VARCHAR(255);
