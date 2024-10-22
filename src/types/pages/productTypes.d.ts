export interface ProductType {
  id: string
  name: string
  category: string
  price: string
  stock: string
}

export interface ProductFormProps {
  type: 'create' | 'update'
  editRow: ProductType | null
  setControl: (value: number) => void
  loadData: () => void
}
