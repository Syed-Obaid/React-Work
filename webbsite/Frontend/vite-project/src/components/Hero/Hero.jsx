import React from 'react'

const Hero = () => {
  return (
    <div className='max-w-7xl mx-auto mt-6'>
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Our Store</h1>
            <p className="text-lg text-gray-600 mb-6">
                Discover the best products at unbeatable prices. Shop now and enjoy exclusive deals!
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Shop Now
            </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
            <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
                alt="Hero"
                className="rounded-lg shadow-md w-full max-w-md"
            />
        </div>
    </div>
    </div>
  )
}

export default Hero
