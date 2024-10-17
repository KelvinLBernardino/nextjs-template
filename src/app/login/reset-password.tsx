'use client'

import React, { ReactElement, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import LoadingButton from '@/components/custom/LoadingButton'
import { useModal } from '@/context/ModalContext'
import { sendNewPassword } from '@/services/authService'
import { msgError } from '@/utils/functions'
import { typeProps } from './types'

// Define the interface for form inputs
interface PasswordFormInputs {
  password: string
  repeatPassword: string
}

/**
 * The password reset page.
 *
 * This page is accessed when the user clicks the "Forgot Password" link on the
 * ResetPassword page.
 *
 * @param {typeProps} props The properties for the page.
 * @return {ReactElement} The JSX element for the page.
 */
const ResetPassword: React.FC<typeProps> = (props: typeProps): ReactElement => {
  // State variable for loading state
  const [isLoading, setIsLoading] = useState(false)

  const ModalContext = useModal()

  // Initialize useForm with default values
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormInputs>({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  })

  // Watch for password changes
  const password = watch('password')

  /**
   * Handle form submission.
   *
   * @param {PasswordFormInputs} data The form data.
   * @return {Promise<void>} A Promise that resolves when the form is submitted.
   */
  const onSubmit: SubmitHandler<PasswordFormInputs> = async (
    data: PasswordFormInputs,
  ): Promise<void> => {
    const { password } = data

    try {
      setIsLoading(true) // Set loading state to true
      // Call the sendNewPassword function from authService
      await sendNewPassword(password, props.token)

      // Redirect the user to the new password page
      reset() // Reset the form
      setIsLoading(false) // Set loading state to false
      props.setControl(0) // Set the control state to 0 to trigger the login form to be displayed
    } catch (error) {
      setIsLoading(false) // Set loading state to false

      const dataMessage = msgError(error)
      ModalContext.showError(dataMessage.message)
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
    // Render the password reset form
    <main className="flex min-h-screen items-center justify-center bg-backColor px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-sm rounded-xl shadow-card">
        <div className="bg-gray-100 p-8 rounded-xl">
          <h1 className="text-2xl font-bold text-center text-primary mb-6">
            Reset Password
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {/* Render the password input field */}
              <label htmlFor="password" className="text-sm text-black">
                Password:
              </label>
              <input
                id="password"
                type="password"
                aria-label="Password"
                className="w-full mt-1 rounded border px-3 py-2 leading-tight text-secondary transition duration-150 
                  hover:border-inputHover focus:shadow-outline focus:outline-primary"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              {/* Render the repeat password input field */}
              <label htmlFor="repeatPassword" className="text-sm text-black">
                Repeat Password:
              </label>
              <input
                id="repeatPassword"
                type="password"
                aria-label="Repeat Password"
                className="w-full mt-1 rounded border px-3 py-2 leading-tight text-secondary transition duration-150 
                  hover:border-inputHover focus:shadow-outline focus:outline-primary"
                {...register('repeatPassword', {
                  required: 'Repeat password is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.repeatPassword && (
                <span className="text-sm text-red-500">
                  {errors.repeatPassword.message}
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

export default ResetPassword
