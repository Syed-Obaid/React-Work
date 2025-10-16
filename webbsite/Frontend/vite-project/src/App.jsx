import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import ProductCard from './components/ProductCard/ProductCard'

const App = () => {
 const [products, setProducts] = useState([]);

useEffect(()=>{
 fetch('http://localhost:3000/api/products')
 .then((res)=> res.json())
 .then((data)=>setProducts(data))
 .catch((err)=>console.log("error fetching products",err))
},[])

  return (
    <>
      <Navbar/>
      <Hero/>
     
     
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


      <Footer/>
    </>
  )
}

export default App
