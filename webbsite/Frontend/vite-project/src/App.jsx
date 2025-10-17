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
      <Hero img="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"/>

     
     
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

    <Hero reverse img="https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_hybrid&w=740&q=80"/>

      <Footer/>
    </>
  )
}

export default App
