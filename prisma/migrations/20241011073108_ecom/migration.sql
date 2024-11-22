-- AlterTable
ALTER TABLE `user` MODIFY `role` VARCHAR(191) NULL DEFAULT 'user',
    MODIFY `enabled` BOOLEAN NULL DEFAULT true;
