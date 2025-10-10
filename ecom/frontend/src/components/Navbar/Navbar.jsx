
    import  { useState } from 'react'

    function Navbar() {
    const [isClick, setIsClick] = useState(false)

    const toggleNavbar = () => {
        setIsClick(!isClick)
    }

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-2xl">
                <a href="#">MyLogo</a>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 text-lg">
                <a href="#" className="hover:text-blue-200 transition">Home</a>
                <a href="#" className="hover:text-blue-200 transition">Contact</a>
                <a href="#" className="hover:text-blue-200 transition">About</a>
                <a href="#" className="hover:text-blue-200 transition">Services</a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                onClick={toggleNavbar}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                {isClick ? (
                    // Close icon
                    <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                ) : (
                    // Hamburger icon
                    <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                    </svg>
                )}
                </button>
            </div>
            </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isClick && (
            <div className="md:hidden bg-blue-700 transition-all duration-300 ease-in-out">
            <div className="flex flex-col items-center space-y-4 py-4 text-lg">
                <a href="#" className="hover:text-blue-300 transition">Home</a>
                <a href="#" className="hover:text-blue-300 transition">Contact</a>
                <a href="#" className="hover:text-blue-300 transition">About</a>
                <a href="#" className="hover:text-blue-300 transition">Services</a>
            </div>
            </div>
        )}
        </nav>
    )
    }

    export default Navbar
