import React from 'react'
import Sidebar from '@/components/Sidebar'

/**
 * The Home component renders the home page of the application.
 *
 * @return {ReactElement} The rendered Home component.
 */
const Home = (): React.ReactElement => {
  return (
    <div className="flex flex-row">
      {/* The sidebar component */}
      <Sidebar />

      {/* The main content of the page */}
      <main className="flex flex-col items-center justify-center p-6 bg-gray-100 h-screen w-5/6">
        {/* The title of the page */}
        <h1 className="text-4xl font-bold text-gray-800">
          Template Painel Gerencial!
        </h1>

        {/* The description of the page */}
        <p className="mt-4 text-lg text-gray-600">
          Painel criado para servir de template com um login padrão e um
          cadastro de usários.
        </p>
      </main>
    </div>
  )
}

export default Home
