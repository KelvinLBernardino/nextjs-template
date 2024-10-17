'use client'

import React, { ReactElement, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import LoadingButton from '@/components/custom/LoadingButton'
import { useModal } from '@/context/ModalContext'
import { sendEmail } from '@/services/authService'
import { msgError } from '@/utils/functions'
import { typeProps } from './types'

// Define the form inputs interface
interface EmailFormInputs {
  email: string
}

/**
 * The ForgotPassword component renders a ForgotPassword form and handles the ForgotPassword process.
 *
 * @param {typeProps} props The props object passed to the component.
 * @return {ReactElement} The rendered ForgotPassword component.
 */
const ForgotPassword: React.FC<typeProps> = (props): ReactElement => {
  // State variable for loading state
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const ModalContext = useModal()

  // Initialize useForm with default values
  const {
    register, // Registers input elements
    reset, // Resets the form
    handleSubmit, // Handles form submission
    formState: { errors }, // Gets form errors
  } = useForm<EmailFormInputs>({
    defaultValues: {
      email: '', // Default email value
    },
  })

  /**
   * Handles the form submission event.
   *
   * @param {EmailFormInputs} data The form data.
   * @return {Promise<void>} A Promise that resolves when the form is submitted.
   */
  const onSubmit: SubmitHandler<EmailFormInputs> = async (
    data: EmailFormInputs,
  ): Promise<void> => {
    const { email } = data

    try {
      setIsLoading(true)
      // Call the sendEmail function from the authService
      const response = await sendEmail(email, props.token)

      if (response?.token) {
        props.setToken(response.token) // Set the token in the login page state
        reset() // Reset the form
        setIsLoading(false) // Set loading state to false
        props.setControl(2) // Set the control state to 2 to trigger the "Verify Code" page
      } else {
        setIsLoading(false) // Set loading state to false
        console.log('email inválido')
      }
    } catch (error) {
      setIsLoading(false)

      const dataMessage = msgError(error)
      ModalContext.showError(dataMessage.message)
    }
  }

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

  return (
    // Render the email form
    <main className="flex min-h-screen items-center justify-center bg-backColor px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-sm rounded-xl shadow-card">
        <div className="bg-gray-100 p-8 rounded-xl">
          <h1 className="text-2xl font-bold text-center text-primary mb-6">
            Trocar Senha
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {/* Render the user email input field */}
              <label htmlFor="email" className="text-sm text-black">
                Email:
              </label>
              <input
                id="email"
                type="text"
                aria-label="Email"
                className="w-full mt-1 rounded border px-3 py-2 leading-tight text-secondary transition duration-150 
                  hover:border-inputHover focus:shadow-outline focus:outline-primary"
                {...register('email', { required: 'Email é obrigatório' })}
              />
              {/* Render the error message if the email input field is invalid */}
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
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

export default ForgotPassword
