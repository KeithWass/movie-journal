ALTER TABLE "MovieEntry"
ADD COLUMN "watched" BOOLEAN NOT NULL DEFAULT false;

UPDATE "MovieEntry"
SET "watched" = true
WHERE "status" = 'Watched';

ALTER TABLE "MovieEntry"
DROP COLUMN "status";