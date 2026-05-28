'use client'

interface BarItem {
  label: string
  value: number
}

interface BarChartProps {
  data: BarItem[]
  valueLabel?: string
}

export default function BarChart({ data, valueLabel }: BarChartProps) {
  if (data.length === 0) return null

  const maxVal = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <span className="w-40 truncate text-xs text-gray-600" title={item.label}>
            {item.label}
          </span>
          <div className="flex-1 h-5 rounded bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded bg-blue-500 transition-all"
              style={{ width: `${(item.value / maxVal) * 100}%` }}
            />
          </div>
          <span className="w-14 text-right text-xs text-gray-500">
            {item.value.toLocaleString()}
          </span>
        </div>
      ))}
      {valueLabel && (
        <p className="text-right text-[10px] text-gray-400">{valueLabel}</p>
      )}
    </div>
  )
}
