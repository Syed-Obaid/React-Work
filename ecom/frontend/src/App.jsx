import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ProductCard from './components/ProductCard/ProductCard';
import Footer from './components/Footer/Footer';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     


  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/products');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Hero />

      <div className="flex flex-wrap justify-center mt-10">
        {loading ? (
          <p className="text-gray-600 text-lg">Loading products...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : products.length > 0 ? (
          products.map((item, index) => (
            <ProductCard
              key={index}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No products found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
