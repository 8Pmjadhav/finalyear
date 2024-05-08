/*
  Warnings:

  - You are about to drop the column `backgroundImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "backgroundImage",
DROP COLUMN "profileImage",
ADD COLUMN     "avatar" VARCHAR(255),
ADD COLUMN     "backcover" VARCHAR(255);
