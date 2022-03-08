import { useSubject } from '../../utils/Subject'
import { CREATE_PRODUCT } from '../../types/Product'
import { AddProductProps } from './AddProduct'

export function useAddProduct(): AddProductProps {
  const productName = useSubject<string>('')
  const productPrice = useSubject<number>(0)
  const productQuantity = useSubject<number>(0)

  async function submitProduct() {
    const product = await CREATE_PRODUCT.call({
      name: productName.value,
      price: productPrice.value,
      quantity: productQuantity.value
    })
    console.log(product)
  }

  return {
    productName,
    productQuantity,
    productPrice,
    submitProduct
  }
}

export function useAddProductMock(): AddProductProps {
  return {
    ...useAddProduct(),
    submitProduct() {
      console.log('unlucky')
    }
  }
}
