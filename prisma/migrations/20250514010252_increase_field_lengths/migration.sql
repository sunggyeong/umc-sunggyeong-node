-- AlterTable
ALTER TABLE `food_category` MODIFY `name` VARCHAR(63) NOT NULL;

-- AlterTable
ALTER TABLE `region` MODIFY `name` VARCHAR(63) NOT NULL;

-- AlterTable
ALTER TABLE `store` MODIFY `store_name` VARCHAR(123) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(63) NOT NULL,
    MODIFY `name` VARCHAR(63) NOT NULL,
    MODIFY `gender` VARCHAR(31) NOT NULL,
    MODIFY `phone_number` VARCHAR(20) NOT NULL;
