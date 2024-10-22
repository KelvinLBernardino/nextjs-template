'use client'

import React, { ReactElement, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useModal } from '@/context/ModalContext'
import { createUser, updateUser } from '@/services/userService'
import { msgError, getDifferences } from '@/utils/functions'
import { UserType, UserFormProps } from '@/types/pages/userTypes'

export const UserForm: React.FC<UserFormProps> = (
  props: UserFormProps,
): ReactElement => {
  const [uuid, setUuid] = useState<string>('')

  const ModalContext = useModal()

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>()

  const handleCancel = (): void => {
    reset()
    props.setControl(0)
  }

  const handleConfirm = (): void => {
    reset()
    props.loadData()
    props.setControl(0)
  }

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    if (props.type === 'create') {
      try {
        ModalContext.showLoading()
        await createUser(data)

        ModalContext.hideLoading()
        ModalContext.showSuccess('Usuário criado com sucesso!', handleConfirm)
      } catch (error) {
        const dataMessage = msgError(error)

        ModalContext.hideLoading()
        ModalContext.showError(dataMessage.message)
      }
    } else if (props.type === 'update') {
      const differences = getDifferences(
        props.editRow as Partial<UserType>,
        data,
      )
      if (Object.keys(differences).length > 0) {
        try {
          ModalContext.showLoading()
          await updateUser(uuid, differences)

          ModalContext.hideLoading()
          ModalContext.showSuccess(
            'Usuário editado com sucesso!',
            handleConfirm,
          )
        } catch (error) {
          const dataMessage = msgError(error)

          ModalContext.hideLoading()
          ModalContext.showError(dataMessage.message)
        }
      }
    }
  }

  useEffect(() => {
    if (props.type === 'update') {
      setValue('name', props.editRow?.name || '')
      setValue('email', props.editRow?.email || '')
      setValue('role', props.editRow?.role || '')
      setValue('status', props.editRow?.status || '')
      setUuid(props.editRow?.id || '')
    }
  }, [
    props.editRow?.email,
    props.editRow?.id,
    props.editRow?.name,
    props.editRow?.role,
    props.editRow?.status,
    props.type,
    setValue,
  ])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto w-full bg-white p-12 rounded-lg shadow-lg my-12"
      aria-labelledby="new-user-form-title"
    >
      <fieldset className="space-y-8">
        <legend
          id="new-user-form-title"
          className="text-2xl font-semibold text-gray-800 mb-6"
        >
          Criar Novo Usuário
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Nome é obrigatório' })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition 
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-primary ${
                  errors.name
                    ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                    : 'border-gray-600 focus:border-gray-800'
                }`}
              placeholder="Digite seu nome"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby="name-error"
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register('email', {
                required: 'Email é obrigatório',
              })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition 
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-primary ${
                  errors.email
                    ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                    : 'border-gray-600 focus:border-gray-800'
                }`}
              placeholder="Digite seu email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Função
            </label>
            <input
              id="role"
              type="text"
              {...register('role', { required: 'Função é obrigatório' })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition 
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-primary ${
                  errors.role
                    ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                    : 'border-gray-600 focus:border-gray-800'
                }`}
              placeholder="Digite sua função"
              aria-invalid={errors.role ? 'true' : 'false'}
              aria-describedby="role-error"
            />
            {errors.role && (
              <p id="role-error" className="mt-2 text-sm text-red-600">
                {errors.role.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <input
              id="status"
              type="text"
              {...register('status', {
                required: 'Status é obrigatório',
              })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition 
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-primary ${
                  errors.status
                    ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                    : 'border-gray-600 focus:border-gray-800'
                }`}
              placeholder="Digite seu status"
              aria-invalid={errors.status ? 'true' : 'false'}
              aria-describedby="status-error"
            />
            {errors.status && (
              <p id="status-error" className="mt-2 text-sm text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="w-40 rounded-md border bg-gray-100 border-black px-4 py-2 text-sm font-medium text-black shadow-md 
                  transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          aria-label="Voltar"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-40 rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition 
                  duration-150 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          aria-label="Entrar"
        >
          {props.type === 'create' ? 'Criar' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
