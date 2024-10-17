import React from 'react'
import { FaHome, FaUser, FaSignOutAlt, FaBox } from 'react-icons/fa'

const Sidebar: React.FC = () => {
  const menu = [
    {
      name: 'Home',
      href: '/home',
      icon: FaHome,
    },
    {
      name: 'Users',
      href: '/user',
      icon: FaUser,
    },
    {
      name: 'Products',
      href: '/product',
      icon: FaBox,
    },
    {
      name: 'Logout',
      href: '/logout',
      icon: FaSignOutAlt,
    },
  ]

  return (
    <aside className="w-1/6 h-screen bg-gray-800 text-white">
      {/* Sidebar header */}
      <header className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-2xl font-bold">Logo</h1>
      </header>

      {/* Main navigation */}
      <nav className="mt-10" aria-label="Main navigation">
        <ul className="space-y-2">
          {menu.map((item) => {
            const IconComponent = item.icon

            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2
                focus:ring-blue-500"
                  aria-current="page"
                >
                  <IconComponent className="h-4 w-4" aria-hidden="true" />
                  <span className="ml-4">{item.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
