/*
  Warnings:

  - Added the required column `driver_name` to the `shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_plate` to the `shipments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CargoType" AS ENUM ('GENERAL', 'REFRIGERATED', 'HAZARDOUS', 'FRAGILE', 'BULK');

-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "cargo_type" "CargoType" NOT NULL DEFAULT 'GENERAL',
ADD COLUMN     "driver_name" TEXT NOT NULL,
ADD COLUMN     "license_plate" TEXT NOT NULL;
