'use client'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaUserAlt } from 'react-icons/fa'

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Landing Page</title>
        <meta
          name="description"
          content="A simple landing page with Next.js and Tailwind CSS"
        />
      </Head>

      <header className="bg-gray-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Landing Page</h1>
          <nav>
            <a href="#about" className="mr-12 hover:underline">
              About Us
            </a>
            <a href="#contact" className="mr-12 hover:underline">
              Contact Us
            </a>
            <a href="#services" className="mr-12 hover:underline">
              Services
            </a>
            <a href="#galery" className="hover:underline">
              Galery
            </a>
          </nav>
          <button
            className="bg-white text-gray-500 px-4 py-2 rounded-md flex items-center hover:bg-gray-200 transition"
            onClick={() => router.push('/login')}
          >
            <FaUserAlt className="mr-4" /> Iniciar Sessão
          </button>
        </div>
      </header>

      <main>
        <section className="bg-gray-100 h-screen">
          <div className="container mx-auto flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome to Our Landing Page
            </h2>
            <p className="mt-4 text-gray-600">
              Discover our amazing features and get started today!
            </p>
            <button className="mt-8 px-8 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-700 transition">
              Get Started
            </button>
          </div>
        </section>

        {/* <section id="about" className="container mx-auto py-20">
          <h3 className="text-3xl font-bold text-center text-gray-800">
            Features
          </h3>
          <div className="flex flex-wrap justify-center mt-10 space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Feature One</h4>
              <p className="text-gray-600">
                Brief description of this feature goes here.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Feature Two</h4>
              <p className="text-gray-600">
                Brief description of this feature goes here.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Feature Three</h4>
              <p className="text-gray-600">
                Brief description of this feature goes here.
              </p>
            </div>
          </div>
        </section> */}

        <section id="about" className="bg-gray-50 py-16 h-screen">
          <div className="container mx-auto flex items-center">
            <div className="flex w-1/2 justify-center">
              <Image
                src="https://picsum.photos/500/800"
                alt="Team"
                width={500}
                height={800}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-1/2 pl-12">
              <h2 className="text-4xl font-bold text-gray-900">About Us</h2>
              <p className="mt-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                rhoncus erat eget lectus eleifend sodales. Donec vel nunc sit
                amet velit mattis luctus. Ut venenatis euismod ipsum vitae
                vulputate. Proin eu iaculis urna. Cras sed nulla sollicitudin,
                tincidunt enim vel, lobortis eros. Vestibulum tempor diam sit
                amet lorem ultricies volutpat. Pellentesque ut sollicitudin
                purus. Nullam blandit tellus eget nisl faucibus.
              </p>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                rhoncus erat eget lectus eleifend sodales. Donec vel nunc sit
                amet velit mattis luctus. Ut venenatis euismod ipsum vitae
                vulputate. Proin eu iaculis urna. Cras sed nulla sollicitudin,
                tincidunt enim vel, lobortis eros. Vestibulum tempor diam sit
                amet lorem ultricies volutpat. Pellentesque ut sollicitudin
                purus. Nullam blandit tellus eget nisl faucibus.
              </p>
              <button className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-md shadow hover:bg-gray-600 transition">
                Read More
              </button>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="bg-gray-600 py-20 text-center text-white"
        >
          <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
          <button className="mt-8 px-8 py-3 bg-white text-gray-600 rounded-md hover:bg-gray-100 transition">
            Join Now
          </button>
        </section>

        <section id="services" className="container mx-auto py-20">
          <h3 className="text-3xl font-bold text-center text-gray-800">
            Our Services
          </h3>
          <div className="flex flex-wrap justify-center mt-10 space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Service One</h4>
              <p className="text-gray-600">
                Brief description of this service goes here.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Service Two</h4>
              <p className="text-gray-600">
                Brief description of this service goes here.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Service Three</h4>

              <p className="text-gray-600">
                Brief description of this service goes here.
              </p>
            </div>
          </div>
        </section>

        <section id="galery" className="container mx-auto py-20">
          <h3 className="text-3xl font-bold text-center text-gray-800">
            Our Galery
          </h3>
          <div className="flex flex-wrap justify-center mt-10 space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Image One</h4>
              <p className="text-gray-600">
                Brief description of this image goes here.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Image Two</h4>
              <p className="text-gray-600">
                Brief description of this image goes here.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Image Three</h4>
              <p className="text-gray-600">
                Brief description of this image goes here.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 My Landing Page. All rights reserved.</p>
      </footer>
    </div>
  )
}
