import React from 'react'

const Footer = () => {
return (
    <footer className="bg-gray-700 h-10 text-white py-5 mt-4 flex justify-center items-center">
        <p>&copy; {new Date().getFullYear()} Ecom Store. All rights reserved.</p>
    </footer>
)
}

export default Footer
