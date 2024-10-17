export interface ProductType {
  id: string
  name: string
  category: number
  price: string
  stock: string
}

export interface ProductFormInputs {
  name: string
  category: number
  price: string
  stock: string
}

export interface ProductFormProps {
  type: 'create' | 'update'
  editUser: ProductType | null
  setControl: (value: number) => void
}
