'use client'

interface TrendPoint {
  date: string
  pageviews: number
  users: number
}

interface TrendChartProps {
  data: TrendPoint[]
  pvLabel: string
  uvLabel: string
}

export default function TrendChart({ data, pvLabel, uvLabel }: TrendChartProps) {
  if (data.length === 0) return null

  const width = 600
  const height = 200
  const padding = { top: 20, right: 20, bottom: 30, left: 45 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  const maxPV = Math.max(...data.map((d) => d.pageviews), 1)
  const maxUV = Math.max(...data.map((d) => d.users), 1)
  const maxVal = Math.max(maxPV, maxUV)

  const xStep = chartW / Math.max(data.length - 1, 1)

  const toY = (val: number) => padding.top + chartH - (val / maxVal) * chartH
  const toX = (i: number) => padding.left + i * xStep

  const pvPoints = data.map((d, i) => `${toX(i)},${toY(d.pageviews)}`).join(' ')
  const uvPoints = data.map((d, i) => `${toX(i)},${toY(d.users)}`).join(' ')

  const yTicks = [0, Math.round(maxVal / 2), maxVal]

  const formatDate = (d: string) => {
    if (d.length === 8) return `${d.slice(4, 6)}/${d.slice(6, 8)}`
    return d.slice(5)
  }

  const xLabelInterval = Math.max(1, Math.floor(data.length / 6))

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[400px]" preserveAspectRatio="xMidYMid meet">
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={toY(tick)}
              x2={width - padding.right}
              y2={toY(tick)}
              stroke="#e5e7eb"
              strokeDasharray="3,3"
            />
            <text x={padding.left - 8} y={toY(tick) + 4} textAnchor="end" className="text-[10px] fill-gray-400">
              {tick}
            </text>
          </g>
        ))}

        <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={pvPoints} />
        <polyline fill="none" stroke="#10b981" strokeWidth="2" points={uvPoints} />

        {data.map((d, i) => (
          <g key={i}>
            <circle cx={toX(i)} cy={toY(d.pageviews)} r="3" fill="#3b82f6" />
            <circle cx={toX(i)} cy={toY(d.users)} r="3" fill="#10b981" />
            {i % xLabelInterval === 0 && (
              <text x={toX(i)} y={height - 5} textAnchor="middle" className="text-[9px] fill-gray-400">
                {formatDate(d.date)}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-center gap-6 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-4 rounded bg-blue-500" />
          {pvLabel}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-4 rounded bg-emerald-500" />
          {uvLabel}
        </span>
      </div>
    </div>
  )
}
