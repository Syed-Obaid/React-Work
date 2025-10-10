import React from 'react'
import './ProductCard.css'
const ProductCard = ({image,title,description}) => {
return (
    <div className='pdt'>
        <div className="max-w-xs mt-5 rounded overflow-hidden shadow-lg bg-white">
            <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                <img
                    className="max-h-full max-w-full object-contain"
                    src={image}
                    alt="Product"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                {description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex items-center justify-between">
                <span className="text-lg font-semibold text-green-600">$29.99</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
)
}

export default ProductCard
