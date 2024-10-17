'use client'

import React, { ReactElement, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import LoadingButton from '@/components/custom/LoadingButton'
import { useModal } from '@/context/ModalContext'
import { keyLocalStorage } from '@/config/constants'
import { login } from '@/services/authService'
import { msgError } from '@/utils/functions'
import { typeProps } from './types'

// Define the form inputs interface
interface LoginFormInputs {
  userName: string
  password: string
  isRememberMe: boolean
}

/**
 * The LoginPage component renders a login form and handles the login process.
 *
 * @return {ReactElement} The rendered LoginPage component.
 */
const LoginPage: React.FC<typeProps> = (props): ReactElement => {
  // State variables for password visibility and loading state
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  // State variable for loading state
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // The router object from the Next.js router hook
  const router = useRouter()
  const ModalContext = useModal()

  // Initialize useForm with default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      userName: '',
      password: '',
      isRememberMe: false,
    },
  })

  /**
   * Handles the login submit event.
   *
   * @param {LoginFormInputs} data The form data.
   * @return {Promise<void>} A Promise that resolves when the login process is complete.
   */
  const onSubmit: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs,
  ): Promise<void> => {
    const { userName, password, isRememberMe } = data

    try {
      setIsLoading(true) // Set loading state to true
      // Call the login function from the authService
      const response = await login(userName, password)

      // Store the response in local storage and the remember me option
      localStorage.setItem(
        keyLocalStorage,
        JSON.stringify({ ...response, remember: isRememberMe }),
      )

      reset() // Reset the form
      setIsLoading(false) // Set loading state to false
      router.push('/') // Redirect the user to the home page
    } catch (error) {
      // Add an error message to the user if necessary
      setIsLoading(false) // Set loading state to false

      const dataMessage = msgError(error)
      ModalContext.showError(dataMessage.message)
    }
  }

  /**
   * Toggles the password visibility.
   *
   * @return {void}
   */
  const togglePasswordVisibility = (): void =>
    setIsPasswordVisible((prevState) => !prevState)

  return (
    // Render the login form
    <main className="flex min-h-screen items-center justify-center bg-backColor px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-sm rounded-xl shadow-card">
        <div className="bg-gray-100 p-8 rounded-xl">
          {/* Render the form title */}
          <h1 className="text-2xl font-bold text-center text-primary mb-6">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {/* Render the user name input field */}
              <label htmlFor="userName" className="text-sm text-black">
                Usuário:
              </label>
              <input
                id="userName"
                type="text"
                aria-label="Nome de usuário"
                className="w-full mt-1 rounded border px-3 py-2 leading-tight text-black transition duration-150 
                  hover:border-inputHover focus:shadow-outline focus:outline-primary"
                {...register('userName', { required: true })}
              />
              {/* Render the user name error message */}
              {errors.userName && (
                <span className="text-sm text-red-500">
                  Nome de usuário é obrigatório
                </span>
              )}
            </div>
            <div className="mb-4 relative">
              {/* Render the password input field */}
              <label htmlFor="password" className="text-sm text-black">
                Senha:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  aria-label="Senha"
                  className="w-full mt-1 rounded border px-3 py-2 pr-10 leading-tight text-black transition 
                    duration-150 hover:border-inputHover focus:shadow-outline focus:outline-primary"
                  {...register('password', { required: true })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-black"
                  aria-label={
                    isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'
                  }
                  aria-pressed={isPasswordVisible}
                >
                  {isPasswordVisible ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {/* Render the password error message */}
              {errors.password && (
                <span className="text-sm text-red-500">
                  Senha é obrigatória
                </span>
              )}
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                {/* Render the remember me checkbox */}
                <input
                  id="isRememberMe"
                  type="checkbox"
                  aria-label="Lembrar-me"
                  className="h-4 w-4 cursor-pointer rounded border-input accent-secondary hover:border-inputHover"
                  {...register('isRememberMe')}
                />
                <label
                  htmlFor="isRememberMe"
                  className="ml-2 text-sm text-black cursor-pointer"
                >
                  Lembrar-me
                </label>
              </div>
              <button
                type="button"
                className="text-sm bg-gray-100 text-black hover:text-gray-700 hover:bg-gray-100"
                onClick={() => props.setControl(1)}
                aria-label="Esqueceu sua senha"
              >
                Esqueceu sua senha?
              </button>
            </div>
            <LoadingButton
              type="submit"
              aria-label="Entrar"
              isLoading={isLoading}
            >
              Entrar
            </LoadingButton>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
