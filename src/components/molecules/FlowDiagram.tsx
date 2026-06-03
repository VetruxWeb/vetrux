'use client'

import type { FlowDiagram as FlowDiagramType } from '@/lib/articleParser'

interface FlowDiagramProps {
  diagram: FlowDiagramType
}

export default function FlowDiagram({ diagram }: FlowDiagramProps) {
  if (diagram.steps.length === 0) return null

  return (
    <div className="my-10">
      {diagram.title && (
        <h3 className="font-display text-lg font-bold text-on-background mb-6 text-center">
          {diagram.title}
        </h3>
      )}

      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-start justify-center gap-0">
        {diagram.steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center text-center w-36">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <p className="mt-2 text-sm font-semibold text-on-background">{step.label}</p>
              <p className="mt-1 text-xs text-on-surface-muted leading-snug">{step.desc}</p>
            </div>
            {i < diagram.steps.length - 1 && (
              <div className="flex items-center h-12">
                <div className="w-8 h-0.5 bg-accent" />
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-accent" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden space-y-0">
        {diagram.steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                {i + 1}
              </div>
              {i < diagram.steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-accent/30 my-1" />
              )}
            </div>
            <div className="pb-6">
              <p className="text-sm font-semibold text-on-background">{step.label}</p>
              <p className="mt-0.5 text-xs text-on-surface-muted">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
