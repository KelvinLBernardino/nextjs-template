'use client'

import React, { ReactElement, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import LoadingButton from '@/components/custom/LoadingButton'

import {
  // User,
  UserFormInputs,
  UserFormProps,
} from '@/types/pages/userTypes'

/**
 * A component that renders a form to create a new user.
 *
 * @param {UserFormProps} props - The props object passed to the component.
 * @return {ReactElement} The rendered UserForm component.
 */
export const UserForm: React.FC<UserFormProps> = (
  props: UserFormProps,
): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Initialize the React Hook Form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>()

  /**
   * Handles the cancel button click event.
   *
   * This function is called when the cancel button is clicked.
   * It sets the control state to 0, which triggers the login form to be displayed.
   */
  const handleCancel = (): void => {
    // Reset the form to its initial state
    reset()
    // Set the control state to 0 to trigger the login form to be displayed
    props.setControl(0)
  }

  /**
   * Handles the submit button click event.
   *
   * This function is called when the submit button is clicked.
   * It sets the loading state to false and logs the form data to the console.
   * You can add the logic to submit the form to an API here.
   */
  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    setIsLoading(false)
    console.log('Form Data:', data)
  }

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
        <LoadingButton
          type="submit"
          className="w-40 rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition 
                  duration-150 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          aria-label="Entrar"
          isLoading={isLoading}
        >
          Criar
        </LoadingButton>
      </div>
    </form>
  )
}
