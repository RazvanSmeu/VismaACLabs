import React from 'react'
import { AddProduct } from './AddProduct'
import { useAddProductMock } from './useAddProduct'

export default {
  title: 'DoubleTex/AddProduct'
}

export function Example() {
  return <AddProduct {...useAddProductMock()} />
}
