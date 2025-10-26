import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
const HeroProducts = () => {
     const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true)


useEffect(() => {
  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => {
      setProducts(data)
      setLoading(false)
    })
    .catch((err) => {
      console.log("error fetching products", err)
      setLoading(false) 
    })
}, [])

if(loading){
    return (
 <div className="flex flex-col items-center mt-20 h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <h1 className="text-3xl font-bold text-center">Loading...</h1>
      </div>
    )
}

if(products.length === 0){
    return (
         <h1 className='text-3xl font-bold text-center mt-20 h-screen'>No Products Found</h1>
    )
}


return (
    <div>
       <div className="flex flex-wrap justify-center gap-2  mt-10">
    {
        products.map((product,index)=>(
            <ProductCard key={index}
            title = {product.title || product.name}
        image = {product.image}
        price= {product.price}
        description={product.description || product.desc}
        />
      ))
    }
     
      </div>
    </div>
  )
}

export default HeroProducts
