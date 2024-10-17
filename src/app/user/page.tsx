/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'

import Sidebar from '@/components/Sidebar'
import Table from '@/components/Table'
import { useModal } from '@/context/ModalContext'
import { getUsers } from '@/services/userService'
import { UserType } from '@/types/pages/userTypes'
import { msgError } from '@/utils/functions'

import { UserForm } from './forms'

const Users = () => {
  const columns = [
    { key: 1, name: 'name', label: 'Nome' },
    { key: 2, name: 'email', label: 'Email' },
    { key: 3, name: 'role', label: 'Função' },
    { key: 4, name: 'status', label: 'Status' },
  ]

  const [selectedData, setSelectedData] = useState<UserType | null>(null)
  const [control, setControl] = useState(0)

  const [rows, setRows] = useState<UserType[]>([])
  const [type, setType] = useState<'create' | 'update'>('create')

  const ModalContext = useModal()

  const loadData = async () => {
    try {
      ModalContext.showLoading()
      const users = await getUsers()
      if (users) {
        setRows(users)
      } else {
        setRows([])
      }
      ModalContext.hideLoading()
    } catch (error) {
      const dataMessage = msgError(error)

      ModalContext.hideLoading()
      ModalContext.showError(dataMessage.message)
    }
  }

  const handleCreate = () => {
    setType('create')
    setControl(1)
    console.log('Create user')
  }

  const handleEdit = (user: UserType) => {
    setSelectedData(user)
    console.log('Edit user:', user)
  }

  const handleDelete = (user: UserType) => {
    console.log('Delete user:', user)
  }

  const ActionButtons = [
    {
      key: 1,
      title: 'Editar',
      icon: FaEdit,
      onClick: handleEdit,
    },
    {
      key: 2,
      title: 'Excluir',
      icon: FaTrash,
      onClick: handleDelete,
    },
  ]

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="flex flex-row">
      <Sidebar />
      {control === 0 ? (
        <main className="flex flex-col p-8 bg-gray-100 h-screen w-5/6">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl">Usuários</h1>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 transition-colors"
              onClick={handleCreate}
            >
              Novo Usuário
            </button>
          </div>
          <div>
            <Table<UserType>
              columns={columns}
              rows={rows}
              ariaLabel="Tabela de Usuários"
              refreshData={() => {}}
              menuAction={ActionButtons}
            />
          </div>
        </main>
      ) : (
        <UserForm
          type={type}
          setControl={setControl}
          editUser={selectedData || null}
        />
      )}
    </div>
  )
}

export default Users
