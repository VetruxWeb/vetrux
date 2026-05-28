interface FormFieldProps {
  label: string
  children: React.ReactNode
  error?: string
  required?: boolean
}

export default function FormField({ label, children, error, required }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
