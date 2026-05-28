'use client'

interface PieItem {
  label: string
  value: number
  color: string
}

interface PieChartProps {
  data: PieItem[]
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function PieChart({ data: rawData }: PieChartProps) {
  const data = rawData.map((d, i) => ({
    ...d,
    color: d.color || COLORS[i % COLORS.length],
  }))

  const total = data.reduce((sum, d) => sum + d.value, 0)
  if (total === 0) return null

  const size = 120
  const center = size / 2
  const radius = 45
  const strokeWidth = 24

  let cumulative = 0
  const segments = data.map((item) => {
    const pct = item.value / total
    const offset = cumulative
    cumulative += pct
    return { ...item, pct, offset }
  })

  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${seg.pct * circumference} ${circumference}`}
            strokeDashoffset={-seg.offset * circumference}
            transform={`rotate(-90 ${center} ${center})`}
          />
        ))}
      </svg>
      <div className="space-y-1">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
            <span className="text-gray-600">{seg.label}</span>
            <span className="text-gray-400">{Math.round(seg.pct * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
