import {
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from 'react-icons/ai'
import { useModal } from '@/context/ModalContext'

interface ModalProps {
  message: string
}

export const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-4 bg-white rounded-lg shadow-lg flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-600" />
        <span className="ml-4 text-lg">Carregando...</span>
      </div>
    </div>
  )
}

export const ErrorModal = ({ message }: ModalProps) => {
  const { hideError } = useModal()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <AiOutlineCloseCircle className="text-8xl text-red-600 mb-8" />
        <span className="text-2xl text-center text-red-600 mb-10">
          {message}
        </span>
        <button
          onClick={hideError} // Fecha o modal quando o botão é clicado
          className="px-6 py-2 w-32 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}

export const SuccessModal = ({ message }: ModalProps) => {
  const { hideSuccess } = useModal()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <AiOutlineCheckCircle className="text-8xl text-green-600 mb-8" />
        <span className="text-2xl text-center text-green-600 mb-10">
          {message}
        </span>
        <button
          onClick={hideSuccess}
          className="px-6 py-2 w-32 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}

export const ConfirmModal = ({ message }: ModalProps) => {
  const { hideConfirm } = useModal()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <AiOutlineExclamationCircle className="text-8xl text-yellow-600 mb-8" />
        <span className="text-2xl text-center text-gray-800 mb-10">
          {message}
        </span>
        <div className="flex space-x-4">
          <button
            onClick={() => hideConfirm(false)}
            className="px-6 py-2 w-32 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => hideConfirm(true)}
            className="px-6 py-2 w-32 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
