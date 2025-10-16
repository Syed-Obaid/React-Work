import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ProductCard from './components/ProductCard/ProductCard';
import Footer from './components/Footer/Footer';

const App = () => {
  const [products, setProducts] = useState([]);

useEffect(()=>{
 fetch('http://localhost:3000/api/products')
 .then((res)=> res.json())
 .then((data)=>setProducts(data))
 .catch((err)=>console.log("error fetching products",err))
},[])
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Hero />

      <div className="flex flex-wrap justify-center mt-10">
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

    

      <Footer />
    </div>
  );
};

export default App;