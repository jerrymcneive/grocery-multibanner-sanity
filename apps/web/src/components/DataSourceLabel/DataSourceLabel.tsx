interface DataSourceLabelProps {
  source: 'default' | 'override'
}

/**
 * POC-only ribbon overlay. Mount inside a `relative`-positioned parent.
 * Only renders when NEXT_PUBLIC_SHOW_DATA_SOURCE_LABELS=true.
 */
export function DataSourceLabel({ source }: DataSourceLabelProps) {
  if (process.env.NEXT_PUBLIC_SHOW_DATA_SOURCE_LABELS !== 'true') {
    return null
  }

  return (
    <div className="absolute top-3 right-3 z-10">
      {source === 'override' ? (
        <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
          Banner override
        </span>
      ) : (
        <span className="bg-text-muted text-primary-foreground text-xs font-bold px-2 py-1 rounded">
          Sanity default
        </span>
      )}
    </div>
  )
}
