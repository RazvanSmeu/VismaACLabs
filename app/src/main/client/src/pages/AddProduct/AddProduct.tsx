import React from 'react'
import './AddProduct.css'
import InventoryIcon from '@mui/icons-material/Inventory'
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import { Subject } from '../../utils/Subject'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useAddProduct } from './useAddProduct'
import { DbxInput } from '../../components/Input/DbxInput'

export interface AddProductProps {
  productName: Subject<string>
  productPrice: Subject<number>
  productQuantity: Subject<number>
  submitProduct: () => void | Promise<void>
}

export function AddProduct({
  productName,
  productPrice,
  productQuantity,
  submitProduct
}: AddProductProps) {
  return (
    <div>
      <InventoryIcon />
      <h2> Add Product</h2>
      <div className={'addProduct__container'}>
        <DbxInput
          id={'product-name'}
          label='Product Name'
          type='text'
          autoComplete='off'
          subject={productName}
        />
        <DbxInput
          id={'product-price'}
          label='Product price'
          type='number'
          autoComplete='off'
          subject={productPrice}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>
          }}
        />
        <DbxInput
          id={'product-quantity'}
          label='Number of products'
          type='number'
          autoComplete='off'
          subject={productQuantity}
          InputProps={{
            readOnly: Number(productQuantity.value) === 0,
            startAdornment: (
              <InputAdornment position='start'>
                <IconButton
                  onClick={() => productQuantity.set(Number(productQuantity.value) - 1)}
                  disabled={productQuantity.value === 0}>
                  <ArrowBackIosNewIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton onClick={() => productQuantity.set(Number(productQuantity.value) + 1)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button type='submit' variant='contained' onClick={submitProduct}>
          Add Product
        </Button>
      </div>
    </div>
  )
}

export function AddProductPage() {
  return <AddProduct {...useAddProduct()} />
}
