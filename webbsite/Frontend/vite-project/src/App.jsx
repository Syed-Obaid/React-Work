import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

import HeroProducts from './components/HeroProducts/HeroProducts'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { Routes, Route } from "react-router-dom";

const App = () => {
//   const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>
   
//   },
//    {
//     path: "/about",
//     element: <About/>
   
//   },
//    {
//     path: "/contact",
//     element: <Contact/>
   
//   }
// ]);
//  const [products, setProducts] = useState([]);

// useEffect(()=>{
//  fetch('http://localhost:3000/api/product')
//  .then((res)=> res.json())
//  .then((data)=>setProducts(data))
//  .catch((err)=>console.log("error fetching products",err))
// },[])

  return (
    <>
      <Navbar/>

            {/* Routing area */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Hero img="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"/>
{/* <RouterProvider router={router} /> */}

     
     
   {/* <div className="flex flex-wrap justify-center gap-2  mt-10">
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
     
      </div> */}
<HeroProducts/>
    <Hero reverse img="https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_hybrid&w=740&q=80"/>

      <Footer/>
    </>
  )
}

export default App
