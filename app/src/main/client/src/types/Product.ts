import { Identifiable } from './Identifiable'
import { CrudMethod, Endpoint, ParamLocation } from '../utils/Http'

export interface Product extends Identifiable {
  name: string
  quantity: number
  price: number
}

type CreateProductBody = Omit<Product, 'id'>

export const CREATE_PRODUCT = Endpoint<CreateProductBody, Product>(
  CrudMethod.POST,
  '/api/product/',
  ParamLocation.InBody
)

export const FETCH_PRODUCTS = Endpoint<void, Array<Product>>(CrudMethod.GET, '/api/product/')
