'use client'

import React, { ReactElement, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import LoadingButton from '@/components/custom/LoadingButton'

import {
  // ProductType,
  ProductFormInputs,
  ProductFormProps,
} from '@/types/pages/productTypes'

/**
 * A component that renders a form to create a new user.
 *
 * @param {UserFormProps} props - The props object passed to the component.
 * @return {ReactElement} The rendered UserForm component.
 */
export const UserForm: React.FC<ProductFormProps> = (
  props: ProductFormProps,
): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Initialize the React Hook Form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>()

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
  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
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
          Criar Novo Produto
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
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>
            <input
              id="category"
              type="text"
              {...register('category', {
                required: 'Categoria é obrigatório',
              })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition 
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-primary ${
                  errors.category
                    ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                    : 'border-gray-600 focus:border-gray-800'
                }`}
              placeholder="Digite a categoria"
              aria-invalid={errors.category ? 'true' : 'false'}
              aria-describedby="category-error"
            />
            {errors.category && (
              <p id="category-error" className="mt-2 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Preço
            </label>
            <input
              id="price"
              type="text"
              {...register('price', { required: 'Função é obrigatório' })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition 
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-primary ${
                  errors.price
                    ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                    : 'border-gray-600 focus:border-gray-800'
                }`}
              placeholder="Digite o preço"
              aria-invalid={errors.price ? 'true' : 'false'}
              aria-describedby="price-error"
            />
            {errors.price && (
              <p id="price-error" className="mt-2 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <input
              id="stock"
              type="text"
              {...register('stock', {
                required: 'Estoque é obrigatório',
              })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition 
                focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-primary ${
                  errors.stock
                    ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                    : 'border-gray-600 focus:border-gray-800'
                }`}
              placeholder="Digite o estoque"
              aria-invalid={errors.stock ? 'true' : 'false'}
              aria-describedby="stock-error"
            />
            {errors.stock && (
              <p id="stock-error" className="mt-2 text-sm text-red-600">
                {errors.stock.message}
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
