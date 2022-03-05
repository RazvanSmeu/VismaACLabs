import React from 'react'
import './AddProduct.css'
import InventoryIcon from '@mui/icons-material/Inventory'
import { Button, TextField } from '@mui/material'

export function AddProduct() {
  return (
    <div>
      <InventoryIcon />
      <h2> Add Product</h2>
      <div className={'addProduct__container'}>
        <div>
          <TextField id={'product-name'} />
          <TextField id={'product-price'} />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Add Product
          </Button>
        </div>
      </div>
    </div>
  )
}
