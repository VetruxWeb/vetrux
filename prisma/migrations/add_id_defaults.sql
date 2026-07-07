-- Migration: Add database-level default values for "id" columns on legacy tables
-- Reason: prisma/migration.sql created "id" as TEXT NOT NULL with no DEFAULT.
-- Prisma's @default(cuid()) only applies when writes go through Prisma Client,
-- but this project writes exclusively via supabaseAdmin (Supabase REST client),
-- which bypasses Prisma Client entirely. Application code now sends an explicit
-- id (crypto.randomUUID()) on every insert; this migration is a defense-in-depth
-- safety net at the database level in case any insert path omits it.
-- Execute in Supabase SQL Editor.
--
-- Note: "ProductVariant" and "ProductQuantityTier" already have
-- DEFAULT gen_random_uuid()::text (see prisma/migrations/add_product_variants.sql)
-- and are intentionally not repeated here.

ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Product" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ProductTranslation" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ProductSpec" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ProductFaq" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ProductStep" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ProductMetric" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ProductPackaging" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ProductCompliance" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ProductDocument" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Article" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "ArticleTranslation" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Inquiry" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "Media" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
ALTER TABLE "SiteSetting" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
