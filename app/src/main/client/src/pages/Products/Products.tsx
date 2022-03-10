import React from 'react'
import { SpeedDial, SpeedDialIcon } from '@mui/material'

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => window.location.replace('/addProduct')}
      />
    </div>
  )
}
