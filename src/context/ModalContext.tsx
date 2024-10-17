'use client'

import { createContext, useContext, useState } from 'react'
import {
  LoadingModal,
  ErrorModal,
  SuccessModal,
  ConfirmModal,
} from '@/components/Modais'

interface ModalContextType {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  isConfirm: boolean
  showLoading: () => void
  hideLoading: () => void
  showSuccess: (message?: string, onSuccess?: () => void) => void
  hideSuccess: () => void
  showError: (message?: string) => void
  hideError: () => void
  showConfirm: (message: string, onConfirm?: () => void) => void
  hideConfirm: (type: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal deve ser usado dentro de um ModalProvider')
  }
  return context
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [onSuccess, setOnSuccess] = useState<(() => void) | null>(null)
  const [isConfirm, setIsConfirm] = useState(false)
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null)

  const defaultErrorMessage = 'Erro ao carregar os dados.'
  const defaultSuccessMessage = 'Operação concluída com sucesso!'
  const defaultConfirmMessage = 'Tem certeza que deseja continuar?'

  const showLoading = () => setIsLoading(true)
  const hideLoading = () => setIsLoading(false)

  const showSuccess = (message?: string, onConfirm?: () => void) => {
    setIsSuccess(true)
    setMessage(message || defaultSuccessMessage)
    if (onConfirm) setOnSuccess(() => onConfirm)
  }

  const hideSuccess = () => {
    setIsSuccess(false)
    setMessage(null)
    if (onSuccess) {
      onSuccess()
      setOnSuccess(null)
    }
  }

  const showError = (message?: string) => {
    setIsError(true)
    setMessage(message || defaultErrorMessage)
  }

  const hideError = () => {
    setIsError(false)
    setMessage(null)
  }

  const showConfirm = (message: string, onConfirmLocal?: () => void) => {
    setIsConfirm(true)
    setMessage(message)
    if (onConfirmLocal) setOnConfirm(() => onConfirmLocal)
  }

  const hideConfirm = (type: boolean) => {
    setIsConfirm(false)
    setMessage(null)
    if (onConfirm) {
      if (type === true) {
        onConfirm()
      }
      setOnConfirm(null)
    }
  }

  return (
    <ModalContext.Provider
      value={{
        isLoading,
        isSuccess,
        isError,
        isConfirm,
        showLoading,
        hideLoading,
        showSuccess,
        hideSuccess,
        showError,
        hideError,
        showConfirm,
        hideConfirm,
      }}
    >
      {children}
      {isLoading && <LoadingModal />}
      {isSuccess && <SuccessModal message={message || defaultSuccessMessage} />}
      {isError && <ErrorModal message={message || defaultErrorMessage} />}
      {isConfirm && <ConfirmModal message={message || defaultConfirmMessage} />}
    </ModalContext.Provider>
  )
}
