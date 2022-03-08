import { Identifiable } from './Identifiable'
import { CrudMethod, Endpoint, ParamLocation } from '../utils/Http'

export interface Product extends Identifiable {
  name: string
  quantity: number
  price: number
}

type ProductBody = Omit<Product, 'id'>

export const CREATE_PRODUCT = Endpoint<ProductBody, Product>(
  CrudMethod.POST,
  '/api/product/',
  ParamLocation.InBody
)
