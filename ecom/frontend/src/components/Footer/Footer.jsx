import React from 'react'

const Footer = () => {
return (
    <footer className="bg-gray-900 h-10 text-white py-5  flex justify-center items-center">
        <p>&copy; {new Date().getFullYear()} Ecom Store. All rights reserved.</p>
    </footer>
)
}

export default Footer
