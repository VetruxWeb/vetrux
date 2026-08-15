import { notFound } from 'next/navigation'

// The database-backed admin CMS was retired in the static-first migration.
// Any /admin URL deliberately resolves to the site's 404 page instead of a
// broken login or half-functional dashboard.
export default function AdminPage() {
  notFound()
}
