import { useState } from 'react'
import { FETCH_PRODUCTS, Product } from '../../types/Product'

export async function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  function fetchProducts() {
    return FETCH_PRODUCTS.call().then((value) => value)
  }
  setProducts(await fetchProducts())
  return {
    products
  }
}
