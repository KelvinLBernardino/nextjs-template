'use client'

import React, { useState } from 'react'

import Login from './login'
import Email from './forgot-password'
import Code from './verify-code'
import NewPassword from './reset-password'

const App = () => {
  const [control, setControl] = useState(0)
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
