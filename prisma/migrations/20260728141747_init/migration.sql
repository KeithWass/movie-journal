-- CreateTable
CREATE TABLE "MovieEntry" (
    "id" SERIAL NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "personalRating" INTEGER,
    "status" TEXT NOT NULL,
    "journal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieEntry_pkey" PRIMARY KEY ("id")
);
