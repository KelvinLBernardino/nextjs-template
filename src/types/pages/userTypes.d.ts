export interface UserType {
  id: string
  name: string
  email: number
  role: string
  status: string
}

export interface UserFormInputs {
  name: string
  email: number
  role: string
  status: string
}

export interface UserFormProps {
  type: 'create' | 'update'
  editUser: UserType | null
  setControl: (value: number) => void
}
