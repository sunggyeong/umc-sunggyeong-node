/*
  Warnings:

  - A unique constraint covering the columns `[visit_id]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `review_visit_id_key` ON `review`(`visit_id`);
