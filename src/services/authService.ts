import api from './axiosConfig'
import axios from 'axios'
import { typeAuthResponse } from '@/types/serviceTypes'

/**
 * The login function makes a request to the /auth/login endpoint with the username and password.
 * It returns the response data.
 *
 * @param {string} username The username to use for the login.
 * @param {string} password The password to use for the login.
 * @return {Promise<object>} The response data.
 */
export const login = async (
  username: string,
  password: string,
): Promise<object> => {
  const response = await api.post('/auth/login', { username, password })
  return response.data
}

/**
 * The sendEmail function sends an email to the user with a link to reset their password.
 *
 * @param {string} email The email of the user to send the email to.
 * @param {string} token The user's authentication token.
 * @return {Promise<typeAuthResponse>} The response data.
 */
export const sendEmail = async (
  email: string,
  token: string,
): Promise<typeAuthResponse> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API + '/forgot-my-password',
    { email },
    {
      headers: {
        Authentication: token,
      },
    },
  )
  return response.data
}

/**
 * The sendCode function sends a verification code to the user's email address.
 *
 * @param {string} code - The code sent to user email.
 * @param {string} token - The user's authentication token.
 * @return {Promise<typeAuthResponse>} The response data.
 */
export const sendCode = async (
  code: string,
  token: string,
): Promise<typeAuthResponse> => {
  // Send a POST request to the '/forgot-my-password/code' endpoint with the verification code
  // and the authentication token in the headers.
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/forgot-my-password/code`,
    { code },
    {
      headers: {
        // The 'Authentication' header is required to authenticate the request.
        Authentication: token,
      },
    },
  )
  // Return the response data.
  return response.data
}

/**
 * The sendNewPassword function sends a new password to the server.
 *
 * This function sends a POST request to the '/new-password' endpoint with the user's new password
 * and the authentication token in the headers. The response data is returned.
 *
 * @param {string} password The new password to set.
 * @param {string} token The user's authentication token.
 * @return {Promise<typeAuthResponse>} The response data.
 */
export const sendNewPassword = async (
  password: string,
  token: string,
): Promise<typeAuthResponse> => {
  // Send a POST request to the '/new-password' endpoint with the user's email and authentication token in the headers.
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API + '/new-password',
    // Send the new password in the request body
    { password },
    {
      // Set the Authentication header to the token
      headers: {
        Authentication: token,
      },
    },
  )
  // Return the response data.
  return response.data
}
