/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `BorrowedBook` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `borrowedbook` DROP FOREIGN KEY `BorrowedBook_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `borrowedbook` DROP FOREIGN KEY `BorrowedBook_userId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `BorrowedBook_userId_bookId_key` ON `BorrowedBook`(`userId`, `bookId`);

-- AddForeignKey
ALTER TABLE `BorrowedBook` ADD CONSTRAINT `BorrowedBook_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowedBook` ADD CONSTRAINT `BorrowedBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
