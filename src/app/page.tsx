'use client'

import React, { useState } from 'react'

import Login from './login/login'
import Email from './login/forgot-password'
import Code from './login/verify-code'
import NewPassword from './login/reset-password'

/**
 * App component is responsible for managing the different login pages (login, forgot password, verify code, reset password)
 * based on the control state. It uses the setControl function to update the control state and pass necessary props to
 * the child components.
 */
const App = () => {
  // Control state to manage the different login pages
  const [control, setControl] = useState(0)
  // Token to store the authentication token
  const [token, setToken] = useState('')

  return (
    <div className="flex justify-center items-center max-w-full max-h-full w-full h-screen overflow-hidden bg-bgApp">
      <header className="h-[48px] bg-green-700" />
      {control === 0 ? (
        // Render the login page
        <Login setControl={setControl} token={token} setToken={setToken} />
      ) : control === 1 ? (
        // Render the forgot password page
        <Email setControl={setControl} token={token} setToken={setToken} />
      ) : control === 2 ? (
        // Render the verify code page
        <Code setControl={setControl} setToken={setToken} token={token} />
      ) : control === 3 ? (
        // Render the reset password page
        <NewPassword
          setControl={setControl}
          token={token}
          setToken={setToken}
        />
      ) : (
        // Render an empty fragment if the control state is not recognized
        <></>
      )}
      <footer className="h-[48px] bg-green-700" />
    </div>
  )
}

export default App
