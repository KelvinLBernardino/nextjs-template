export interface UserType {
  id: string
  name: string
  email: string
  role: string
  status: string
}

export interface UserFormProps {
  type: 'create' | 'update'
  editRow: UserType | null
  setControl: (value: number) => void
  loadData: () => void
}
