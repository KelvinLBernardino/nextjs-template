import api from './axiosConfig'

import { ProductType } from '@/types/pages/productTypes'

export const getProducts = async () => {
  const response = await api.get('/product')
  return response.data
}

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/product/${id}`)
  return response.data
}

export const updateProduct = async (id: string, data: Partial<ProductType>) => {
  const response = await api.patch(`/product/${id}`, data)
  return response.data
}

export const createProduct = async (data: ProductType) => {
  const response = await api.post('/product', data)
  return response.data
}
