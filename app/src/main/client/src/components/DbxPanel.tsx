import React, { useMemo } from 'react'
import './DbxPanel.css'

export type DbxPanelProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export function DbxPanel(props: DbxPanelProps) {
  const className = useMemo(() => [props.className, 'x dbx-panel'].join(' '), [props.className])
  return <div {...props} className={className}></div>
}
