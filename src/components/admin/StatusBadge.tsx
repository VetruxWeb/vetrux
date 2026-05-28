export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: 'bg-green-50 text-green-700',
    draft: 'bg-yellow-50 text-yellow-700',
    new: 'bg-blue-50 text-blue-700',
    read: 'bg-gray-100 text-gray-700',
    replied: 'bg-green-50 text-green-700',
    archived: 'bg-gray-100 text-gray-500',
  }

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        styles[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  )
}
