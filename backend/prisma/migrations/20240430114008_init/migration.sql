-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(199) NOT NULL,
    "email" VARCHAR(199) NOT NULL,
    "password" VARCHAR(199) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
