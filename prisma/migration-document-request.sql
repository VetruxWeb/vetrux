-- DocumentRequest table - separate from Inquiry
-- Run in Supabase SQL Editor

CREATE TABLE "DocumentRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "documentType" TEXT NOT NULL DEFAULT 'both',
    "productInterest" TEXT,
    "sourcePage" TEXT,
    "ip" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),
    CONSTRAINT "DocumentRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "DocumentRequest_status_idx" ON "DocumentRequest"("status");
CREATE INDEX "DocumentRequest_createdAt_idx" ON "DocumentRequest"("createdAt");
