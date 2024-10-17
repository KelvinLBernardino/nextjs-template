import { ButtonHTMLAttributes, FC } from 'react'
import { ImSpinner2 } from 'react-icons/im' // Ícone de loading

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

/**
 * LoadingButton component is a custom button that displays a loading spinner
 * when the `isLoading` prop is set to `true`.
 *
 * @param {boolean} isLoading - Indicates whether the button is in a loading state.
 * @param {ReactNode} children - The content of the button.
 * @param {string} className - Additional CSS classes for the button.
 * @param {boolean} disabled - Disables the button if set to `true`.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props - Additional props for the button.
 * @returns {JSX.Element} The rendered LoadingButton component.
 */
/** */
const LoadingButton: FC<LoadingButtonProps> = ({
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className="inline-flex items-center justify-center w-full rounded-md bg-black px-4 py-2 text-sm 
              font-medium text-white shadow-md transition duration-150 hover:bg-gray-700 focus:outline-none 
              focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      // Disable button while loading
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        // Display loading spinner when button is loading
        <ImSpinner2
          className="mr-2 h-5 w-5 animate-spin flex-shrink-0"
          aria-hidden="true"
        />
      ) : (
        // Display button content when not loading
        children
      )}
    </button>
  )
}

export default LoadingButton
