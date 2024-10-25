'use client'

import { FC, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  FaUserAlt,
  FaDesktop,
  FaLaptopCode,
  FaMobileAlt,
  FaPenNib,
  FaEye,
  FaFont,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaChevronUp,
  FaDribbble,
} from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { MdEmail, MdPhone } from 'react-icons/md'
import { BsGlobe } from 'react-icons/bs'

interface FeatureCardProps {
  icon: JSX.Element
  title: string
  description: string
}

interface typeImage {
  id: number
  width: number
  height: number
  description: string
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<typeImage | null>(null)

  const router = useRouter()

  const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
      <div className="bg-white border border-gray-200 p-8 text-center rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-gray-100 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <a href="#" className="text-gray-500 mt-4 inline-block font-semibold">
          Read More
        </a>
      </div>
    )
  }

  const Sidebar: React.FC = () => {
    return (
      <div className="fixed top-1/2 transform -translate-y-1/2 left-0 flex flex-col space-y-4 p-4 bg-gray-200 border-r- border-gray-200 rounded-r-lg">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-blue-600"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-blue-600"
        >
          <FaTwitter size={30} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-pink-600"
        >
          <FaInstagram size={30} />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-blue-600"
        >
          <FaLinkedin size={30} />
        </a>
      </div>
    )
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleImageClick = (image: typeImage) => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  const images = [
    { id: 1, width: 300, height: 200, description: 'Lorem ipsum dolor' },
    { id: 2, width: 300, height: 200, description: 'Lorem ipsum dolor sit' },
    {
      id: 3,
      width: 300,
      height: 200,
      description: 'Lorem ipsum dolor sit amet',
    },
    { id: 4, width: 300, height: 200, description: 'Lorem ipsum dolor' },
    { id: 5, width: 300, height: 200, description: 'Lorem ipsum dolor sit' },
    {
      id: 6,
      width: 300,
      height: 200,
      description: 'Lorem ipsum dolor sit amet',
    },
    { id: 7, width: 300, height: 200, description: 'Lorem ipsum dolor' },
    {
      id: 8,
      width: 300,
      height: 200,
      description: 'Lorem ipsum dolor sit amet',
    },
    { id: 9, width: 300, height: 200, description: 'Lorem ipsum dolor sit' },
    { id: 10, width: 300, height: 200, description: 'Lorem ipsum dolor' },
    {
      id: 11,
      width: 300,
      height: 200,
      description: 'Lorem ipsum dolor sit amet',
    },
    { id: 12, width: 300, height: 200, description: 'Lorem ipsum dolor sit' },
    { id: 13, width: 300, height: 200, description: 'Lorem ipsum dolor' },
    { id: 14, width: 300, height: 200, description: 'Lorem ipsum dolor sit' },
    {
      id: 15,
      width: 300,
      height: 200,
      description: 'Lorem ipsum dolor sit amet',
    },
  ]

  const features: FeatureCardProps[] = [
    {
      icon: <FaDesktop className="text-gray-500 text-3xl" />,
      title: 'Web Development',
      description:
        'Various versions have evolved over the years, sometimes by on purpose injected and the like.',
    },
    {
      icon: <FaLaptopCode className="text-gray-500 text-3xl" />,
      title: 'Unique Experience',
      description:
        'Various versions have evolved over the years, sometimes by on purpose injected and the like.',
    },
    {
      icon: <FaMobileAlt className="text-gray-500 text-3xl" />,
      title: 'Responsive Layouts',
      description:
        'Various versions have evolved over the years, sometimes by on purpose injected and the like.',
    },
    {
      icon: <FaPenNib className="text-gray-500 text-3xl" />,
      title: 'Creative Design',
      description:
        'Various versions have evolved over the years, sometimes by on purpose injected and the like.',
    },
    {
      icon: <FaEye className="text-gray-500 text-3xl" />,
      title: 'Retina Ready Graphics',
      description:
        'Various versions have evolved over the years, sometimes by on purpose injected and the like.',
    },
    {
      icon: <FaFont className="text-gray-500 text-3xl" />,
      title: 'Customizable Fonts',
      description:
        'Various versions have evolved over the years, sometimes by on purpose injected and the like.',
    },
  ]

  return (
    <div>
      <Head>
        <title>Landing Page</title>
        <meta
          name="description"
          content="A simple landing page with Next.js and Tailwind CSS"
        />
      </Head>

      <Sidebar />

      <header className="bg-gray-500 text-white p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">My Landing Page</h1>
          <nav className="hidden md:flex space-x-4 lg:space-x-12">
            <a href="#about" className="hover:underline">
              About Us
            </a>
            <a href="#contact" className="hover:underline">
              Contact Us
            </a>
            <a href="#services" className="hover:underline">
              Services
            </a>
            <a href="#gallery" className="hover:underline">
              Gallery
            </a>
          </nav>
          <button
            className="bg-white text-gray-500 px-3 py-1 md:px-4 md:py-2 rounded-md flex items-center hover:bg-gray-200 transition mt-4 md:mt-0"
            onClick={() => router.push('/login')}
          >
            <FaUserAlt className="mr-2 md:mr-4" /> Iniciar Sessão
          </button>
        </div>
      </header>

      <main
        className="bg-[url('https://picsum.photos/1200/900')] bg-cover bg-center"
        style={{ backgroundAttachment: 'fixed' }}
      >
        <section className="bg-[url('https://picsum.photos/1200/900')] bg-cover bg-center h-screen">
          <div className="mx-auto flex flex-col items-center justify-center h-full text-center p-4 sm:p-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Welcome to Our Landing Page
            </h2>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg lg:text-xl text-white max-w-md">
              Discover our amazing features and get started today!
            </p>
            <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-gray-400 text-white rounded-md hover:bg-gray-700 transition">
              Get Started
            </button>
          </div>
        </section>

        <section
          id="about"
          className="bg-gray-50 py-12 sm:py-16 h-auto sm:h-screen"
        >
          <div className="container mx-auto flex flex-col-reverse sm:flex-row items-center">
            <div className="flex justify-center w-full sm:w-1/2 mt-8 sm:mt-0">
              <Image
                src="https://picsum.photos/500/800"
                alt="Team"
                width={400}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full sm:w-1/2 sm:pl-12 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                About Us
              </h2>
              <p className="mt-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                rhoncus erat eget lectus eleifend sodales. Donec vel nunc sit
                amet velit mattis luctus. Ut venenatis euismod ipsum vitae
                vulputate.
              </p>
              <p className="mt-2 text-gray-700">
                Proin eu iaculis urna. Cras sed nulla sollicitudin, tincidunt
                enim vel, lobortis eros. Vestibulum tempor diam sit amet lorem
                ultricies volutpat.
              </p>
              <button className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-md shadow hover:bg-gray-600 transition">
                Read More
              </button>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 py-12 sm:py-16 h-auto sm:h-screen">
          <div className="container mx-auto flex flex-col sm:flex-row items-center">
            <div className="w-full sm:w-1/2 sm:pl-12 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                About Us 2
              </h2>
              <p className="mt-4 text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                rhoncus erat eget lectus eleifend sodales. Donec vel nunc sit
                amet velit mattis luctus. Ut venenatis euismod ipsum vitae
                vulputate.
              </p>
              <p className="mt-2 text-white">
                Proin eu iaculis urna. Cras sed nulla sollicitudin, tincidunt
                enim vel, lobortis eros. Vestibulum tempor diam sit amet lorem
                ultricies volutpat.
              </p>
              <button className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-md shadow hover:bg-gray-600 transition">
                Read More
              </button>
            </div>
            <div className="flex justify-center w-full sm:w-1/2 mt-8 sm:mt-0">
              <Image
                src="https://picsum.photos/500/800"
                alt="Team"
                width={400}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 text-center text-white px-6 sm:px-20 bg-gray-800">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Ready to Get Started?
          </h3>
          <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-white text-gray-600 rounded-md hover:bg-gray-100 transition">
            Join Now
          </button>
        </section>

        <section id="services" className="bg-gray-50 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Services
          </h2>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        <section
          id="gallery"
          className="mx-auto bg-gray-800 py-10 px-4 sm:px-8 lg:px-20"
        >
          <h2 className="text-center text-white text-2xl font-bold mb-5">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-lg shadow-lg bg-gray-100 opacity-90 p-2 transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={`https://picsum.photos/${image.width}/${image.height}`}
                  alt={`Gallery Image ${image.id}`}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto object-cover"
                />
                <p className="text-gray-800 mt-2">{image.description}</p>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4"
              onClick={handleCloseModal}
            >
              <div
                className="max-h-[70vh] w-auto bg-white p-4 rounded-lg overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={`https://picsum.photos/${selectedImage.width}/${selectedImage.height}`}
                  alt={`Gallery Image ${selectedImage.id}`}
                  height={selectedImage.height * 2}
                  width={selectedImage.width * 2}
                  objectFit="cover"
                  className="rounded-lg"
                />

                <p className="text-gray-800 mt-2">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      <button
        onClick={handleScrollToTop}
        className="fixed bottom-4 right-4 bg-gray-500 text-white rounded-full p-3 shadow-lg transition transform hover:bg-gray-600"
        aria-label="Scroll to top"
      >
        <FaChevronUp size={24} />
      </button>

      <footer className="bg-gray-900 text-gray-300 pt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-4 sm:px-6 lg:px-8">
          {/* Logo e Descrição */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Generic</h2>
            <p className="mb-4">
              Using this template you can make beautiful landing pages without
              any major hardwork.
            </p>
            <div className="flex space-x-4">
              <FaFacebook
                className="hover:text-white cursor-pointer"
                aria-label="Facebook"
              />
              <FaInstagram
                className="hover:text-white cursor-pointer"
                aria-label="Instagram"
              />
              <FaTwitter
                className="hover:text-white cursor-pointer"
                aria-label="Twitter"
              />
              <FaLinkedin
                className="hover:text-white cursor-pointer"
                aria-label="LinkedIn"
              />
              <FaDribbble
                className="hover:text-white cursor-pointer"
                aria-label="Dribbble"
              />
            </div>
          </div>

          {/* Links da Empresa */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">About us</li>
              <li className="hover:text-white cursor-pointer">Contact us</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Gallery</li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">
                Privacy Protection
              </li>
              <li className="hover:text-white cursor-pointer">Safe Payments</li>
              <li className="hover:text-white cursor-pointer">
                Terms of Services
              </li>
              <li className="hover:text-white cursor-pointer">Documentation</li>
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Informações de Contato */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Generic Store
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <HiLocationMarker className="mr-2" aria-hidden="true" />{' '}
                endereço
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-2" aria-hidden="true" /> name@domain.com
              </li>
              <li className="flex items-center">
                <MdPhone className="mr-2" aria-hidden="true" /> +55 (XX)
                12345-6789
              </li>
              <li className="flex items-center">
                <BsGlobe className="mr-2" aria-hidden="true" />{' '}
                www.yourdomain.com
              </li>
              <li className="flex items-center">
                <FaTwitter className="mr-2" aria-hidden="true" /> yourname_tweet
              </li>
            </ul>
          </div>
        </div>

        {/* Linha de Separação e Copyright */}
        <div className="w-full h-px bg-gray-100 opacity-50 mt-10" />
        <div className="bg-gray-800 text-white py-2 text-center">
          <p className="mt-2">
            &copy; 2024 My Landing Page. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
