import React, { FC } from 'react'

interface ITabPanelProps {
  children: React.ReactNode
  index: number
  value: number
  ariaLabel: string
  id: string
}

const TabPanel: FC<ITabPanelProps> = ({
  children,
  value,
  index,
  ariaLabel,
  id,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-hidden={value !== index}
      id={id}
      aria-labelledby={ariaLabel}
    >
      {value === index && children}
    </div>
  )
}

export default TabPanel
