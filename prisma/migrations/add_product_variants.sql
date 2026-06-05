-- Migration: Add ProductVariant, ProductQuantityTier tables + new fields
-- Execute in Supabase SQL Editor

-- Add new fields to Product
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "category" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "moq" TEXT;

-- Add description to ProductTranslation
ALTER TABLE "ProductTranslation" ADD COLUMN IF NOT EXISTS "description" TEXT;

-- ProductVariant table
CREATE TABLE IF NOT EXISTS "ProductVariant" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "productId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId")
      REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- ProductQuantityTier table
CREATE TABLE IF NOT EXISTS "ProductQuantityTier" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "productId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ProductQuantityTier_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ProductQuantityTier_productId_fkey" FOREIGN KEY ("productId")
      REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "ProductQuantityTier_productId_idx" ON "ProductQuantityTier"("productId");
