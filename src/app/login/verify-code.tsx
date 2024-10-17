'use client'

import React, { ReactElement, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import LoadingButton from '@/components/custom/LoadingButton'
import { sendCode } from '@/services/authService'
import { typeProps } from './types'

// Define the form inputs interface
interface CodeFormInputs {
  code: string
}

/**
 * The LoginPage component renders a login form and handles the login process.
 *
 * @return {ReactElement} The rendered LoginPage component.
 */
const LoginPage: React.FC<typeProps> = (props): ReactElement => {
  // State variable for loading state
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Initialize useForm with default values
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeFormInputs>({
    /**
     * The default values for the form inputs.
     */
    defaultValues: {
      code: '',
    },
  })

  /**
   * Handles the form submission event.
   *
   * @param {CodeFormInputs} data The form data.
   * @return {Promise<void>} A Promise that resolves when the form is submitted.
   */
  const onSubmit: SubmitHandler<CodeFormInputs> = async (
    data: CodeFormInputs,
  ): Promise<void> => {
    const { code } = data

    try {
      setIsLoading(true)
      // Call the sendEmail function from the authService
      const response = await sendCode(code, props.token)

      if (response?.token) {
        // Redirect the user to the new password page
        props.setToken(response.token) // Set the token in the login page state
        reset() // Reset the form
        setIsLoading(false) // Set loading state to false
        props.setControl(3) // Set the control state to 3 to trigger the "Reset Password" page
      } else {
        setIsLoading(false) // Set loading state to false
        console.log('código inválido')
      }
    } catch (error) {
      setIsLoading(false) // Set loading state to false
      // Add an error message to the user if necessary
      console.error('Falha ao enviar código:', error)
    }
  }

  /**
   * Handles the cancel button click event.
   *
   * This function is called when the cancel button is clicked.
   * It resets the form and sets the control state to 0, which triggers the login form to be displayed.
   */
  /**
   * Resets the form and sets the control state to 0 to trigger the login form to be displayed.
   *
   * @return {void} This function does not return anything.
   */
  const handleCancel = (): void => {
    // Reset the form to its initial state
    reset()

    // Set the control state to 0 to trigger the login form to be displayed
    props.setControl(0)
  }

  return (
    // Render the code form
    <main className="flex min-h-screen items-center justify-center bg-backColor px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-sm rounded-xl shadow-card">
        <div className="bg-gray-100 p-8 rounded-xl">
          <h1 className="text-2xl font-bold text-center text-primary mb-6">
            Trocar Senha
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {/* Render the code input field */}
              <label htmlFor="code" className="text-sm text-black">
                Code:
              </label>
              <input
                id="code"
                type="text"
                aria-label="Code"
                className="w-full mt-1 rounded border px-3 py-2 leading-tight text-secondary transition duration-150 
                  hover:border-inputHover focus:shadow-outline focus:outline-primary"
                {...register('code', { required: 'Código é obrigatório' })}
              />
              {errors.code && (
                <span className="text-sm text-red-500">
                  {errors.code.message}
                </span>
              )}
            </div>

            {/* Render the submit and cancel buttons */}
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full rounded-md border bg-gray-100 border-black px-4 py-2 text-sm font-medium text-black shadow-md 
                  transition duration-150 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                aria-label="Voltar"
              >
                Voltar
              </button>
              <LoadingButton
                type="submit"
                aria-label="Entrar"
                isLoading={isLoading}
              >
                Enviar
              </LoadingButton>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
