import axios, { AxiosError } from 'axios'

export const msgError = (error: unknown): { message: string } => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError

    // Verificando se existe uma resposta do servidor
    if (axiosError.response) {
      const { status, data } = axiosError.response

      // Tratando alguns códigos de erro HTTP específicos
      switch (status) {
        case 404:
          return { message: 'Recurso não encontrado (404).' }
        case 500:
          return { message: 'Erro interno do servidor (500).' }
        default:
          // Verificando se 'detail' ou 'message' estão presentes
          if (data && typeof data === 'object') {
            if ('detail' in data && typeof data.detail === 'string') {
              return { message: data.detail }
            } else if (
              'detail' in data &&
              Array.isArray(data.detail) &&
              data.detail[0]?.msg
            ) {
              return { message: data.detail[0].msg }
            } else if ('message' in data && typeof data.message === 'string') {
              return { message: data.message }
            }
          }
          // Mensagem genérica para outros códigos de status
          return { message: `Erro inesperado: ${status}` }
      }
    } else if (axiosError.request) {
      // Erro de rede ou timeout (requisição foi feita, mas sem resposta)
      if (axiosError.code === 'ECONNABORTED') {
        return {
          message: 'A requisição demorou muito e foi abortada (timeout).',
        }
      } else {
        return {
          message: 'Falha na conexão com o servidor. Verifique sua internet.',
        }
      }
    } else {
      // Erros que ocorreram durante a configuração da requisição
      return { message: axiosError.message || 'Ocorreu um erro desconhecido.' }
    }
  } else {
    // Para erros que não são do Axios
    return { message: 'Ocorreu um erro inesperado!' }
  }
}
