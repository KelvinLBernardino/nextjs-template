export const formatCPF = (cpf: string): string => {
  const cleanedCPF = cpf.replace(/\D/g, '') // Remove caracteres não numéricos
  const maxDigits = 11
  const truncatedCPF = cleanedCPF.slice(0, maxDigits)

  if (truncatedCPF.length <= 3) {
    return truncatedCPF
  } else if (truncatedCPF.length <= 6) {
    return `${truncatedCPF.slice(0, 3)}.${truncatedCPF.slice(3)}`
  } else if (truncatedCPF.length <= 9) {
    return `${truncatedCPF.slice(0, 3)}.${truncatedCPF.slice(
      3,
      6,
    )}.${truncatedCPF.slice(6)}`
  } else {
    return `${truncatedCPF.slice(0, 3)}.${truncatedCPF.slice(
      3,
      6,
    )}.${truncatedCPF.slice(6, 9)}-${truncatedCPF.slice(9)}`
  }
}

export const formatPhoneNumber = (phoneNumber: string): string => {
  let cleanedPhoneNumber = phoneNumber.replace(/\D/g, '') // Remove caracteres não numéricos
  // Limitar a 13 caracteres
  if (cleanedPhoneNumber.length > 13) {
    cleanedPhoneNumber = cleanedPhoneNumber.slice(0, 13)
  }
  if (cleanedPhoneNumber === '') {
    return ''
  }
  // Construindo a string do telefone gradualmente
  let formattedNumber = '+'
  // Adicionando o código do país
  if (cleanedPhoneNumber.length > 2) {
    formattedNumber += cleanedPhoneNumber.slice(0, 2)
    formattedNumber += ' ('
  } else {
    return formattedNumber + cleanedPhoneNumber
  }
  // Adicionando o DDD
  if (cleanedPhoneNumber.length > 4) {
    formattedNumber += cleanedPhoneNumber.slice(2, 4) + ') '
  } else {
    return formattedNumber + cleanedPhoneNumber.slice(2)
  }
  // Caso tenha 13 dígitos
  if (cleanedPhoneNumber.length === 13) {
    formattedNumber +=
      cleanedPhoneNumber.slice(4, 9) + '-' + cleanedPhoneNumber.slice(9, 13)
    return formattedNumber
  }
  // Caso tenha 12 dígitos ou menos
  if (cleanedPhoneNumber.length > 8) {
    formattedNumber +=
      cleanedPhoneNumber.slice(4, 8) + '-' + cleanedPhoneNumber.slice(8)
  } else {
    return formattedNumber + cleanedPhoneNumber.slice(4)
  }
  return formattedNumber
}

export const capitalizeTextWithoutConnectors = (text: string): string => {
  if (text) {
    const connectors = ['de', 'do', 'da', 'dos', 'das', 'e', 'para', 'com']
    return text
      .toLowerCase()
      .split(' ')
      .map((word, index) =>
        index === 0 || !connectors.includes(word)
          ? word.charAt(0).toUpperCase() + word.slice(1)
          : word,
      )
      .join(' ')
  } else {
    return ''
  }
}

export const textWithoutSpace = (text: string): string => {
  return text.trim()
}

export const formatDateTime = (dateTimeStr: string): string => {
  const dateTime = new Date(dateTimeStr)

  const day = String(dateTime.getDate()).padStart(2, '0')
  const month = String(dateTime.getMonth() + 1).padStart(2, '0') // Os meses são indexados de 0 a 11
  const year = dateTime.getFullYear()

  const hours = String(dateTime.getHours()).padStart(2, '0')
  const minutes = String(dateTime.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} - ${hours}:${minutes}`
}

export const formatDate = (dateStr: string): string => {
  const date = new Date(`${dateStr}T00:00:00Z`)

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Os meses são indexados de 0 a 11
  const year = date.getUTCFullYear()

  return `${day}/${month}/${year}`
}
