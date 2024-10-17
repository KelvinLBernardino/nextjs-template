import api from './axiosConfig'

import { UserType } from '@/types/pages/userTypes'

export const getUsers = async () => {
  const response = await api.get('/user')
  return response.data
}

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/${id}`)
  return response.data
}

export const updateUser = async (id: string, data: UserType) => {
  const response = await api.put(`/user/${id}`, data)
  return response.data
}

export const createUser = async (data: UserType) => {
  const response = await api.post('/user', data)
  return response.data
}
