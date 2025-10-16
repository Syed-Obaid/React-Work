const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.json())
const PORT = 3000


const Allproducts = [
  {
    title: "Wireless Bluetooth Headphones",
    price: 59.99,
    description: "High-quality over-ear wireless headphones with deep bass and noise cancellation.",
    image: "https://smarthub.pk/cdn/shop/files/Factory-Hot-Selling-Air31-Portable-Wireless-Crystal-Earphone-with-Digital-LED-Display.webp?v=1684841971"
  },
  {
    title: "Smartwatch Pro X2",
    price: 129.99,
    description: "Feature-packed smartwatch with heart-rate monitor, GPS, and long-lasting battery.",
    image: "https://glisshop-glisshop-fr-storage.omn.proximis.com/Imagestorage/imagesSynchro/735/735/cbc0d0d3314e76c4b2c80d622600f0d7f3125ead_E24POLAACC454103_POLA0989541_0.jpeg"
  },
  {
    title: "4K Ultra HD Smart TV 55-inch",
    price: 699.99,
    description: "Crystal-clear display with HDR10 and built-in streaming apps.",
    image: "https://www.aysonline.pk/wp-content/uploads/2024/07/TCL-65-inch-65C745-QLED-Android-Smart-LED-TV.png"
  },
  {
    title: "Ergonomic Office Chair",
    price: 189.99,
    description: "Comfortable mesh chair with lumbar support and adjustable armrests.",
    image: "https://m.media-amazon.com/images/I/71aGX3PevYL.jpg"
  },
  {
    title: "Mechanical Gaming Keyboard",
    price: 89.99,
    description: "RGB backlit keyboard with tactile switches for ultimate gaming performance.",
    image: "https://images-cdn.ubuy.co.in/63400c68afe02d2b0c7aeb85-mechanical-gaming-keyboard-87-keys-small.jpg"
  },
  {
    title: "Wireless Mouse",
    price: 29.99,
    description: "Precision optical mouse with ergonomic design and long battery life.",
    image: "https://img.drz.lazcdn.com/static/pk/p/8743024fa6c2a7a62f8a2d85ca0d4b46.jpg_720x720q80.jpg"
  },
  {
    title: "DSLR Camera 24MP",
    price: 499.99,
    description: "Capture stunning images with a 24MP lens and 4K video recording.",
    image: "https://kamerastore.com/cdn/shop/products/15_20-_20KI2366-1.jpg?v=1694175417"
  },
  {
    title: "Laptop Stand Adjustable",
    price: 49.99,
    description: "Aluminum laptop stand for better posture and airflow.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEddt5RGkbNXA-ICFlNKOZIiz7KW38DPJZa4VMlsqErxYn6_3yffqtLti0X08eHqeT32c&usqp=CAU"
  },
  {
    title: "Smart LED Bulb",
    price: 19.99,
    description: "Wi-Fi-enabled LED bulb with 16 million colors controllable via mobile app.",
    image: "https://wbm.com.pk/public/uploads/all/HiqkK9OG9aTPl4FVuGSM5cvxYhSHCkUzzKUrvXqY.jpg"
  },
  {
    title: "Wireless Charger Pad",
    price: 25.99,
    description: "Fast charging pad compatible with iPhone and Android devices.",
    image: "https://m.media-amazon.com/images/I/61YPTIiO1cL._AC_SL1500_.jpg"
  },
  {
    title: "Men’s Running Shoes",
    price: 89.99,
    description: "Lightweight and breathable running shoes for maximum comfort.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmesC7Vhw_yMHcAUx4lUgM3zeCzH8ENJupg&s"
  },
  {
    title: "Women’s Handbag Leather",
    price: 119.99,
    description: "Elegant and durable leather handbag with multiple compartments.",
    image: "https://image.made-in-china.com/202f0j00lpubwDQEOWqV/New-Arrival-Designer-Women-s-Bags-Fashion-Leather-Handbags-Shoulder-Bag-Ladies-Handbags.webp"
  },
  {
    title: "Gaming Monitor 27-inch",
    price: 299.99,
    description: "144Hz refresh rate and 1ms response time for smooth gameplay.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfa38Q33g7zIrN6v6kDUpMAcpvwjjXSWZ3Q&s"
  },
  {
    title: "Portable Bluetooth Speaker",
    price: 45.99,
    description: "Compact speaker with powerful sound and waterproof design.",
    image: "https://myshop.pk/pub/media/catalog/product/cache/26f8091d81cea4b38d820a1d1a4f62be/_/a/_anker_-myshop-pk-1_13.jpg"
  },
  {
    title: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Insulated bottle keeps drinks cold for 24h and hot for 12h.",
    image: "https://laptoplelo.com/wp-content/uploads/2024/09/500ml-Stainless-Steel-Vacuum-Insulated-Water-Bottle-Sweat-Leak-Proof-BPA-Free-Travel-Flask-4.webp"
  },
  {
    title: "Fitness Resistance Bands Set",
    price: 34.99,
    description: "Set of 5 resistance bands for home workouts and physical therapy.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIH7lX5uprxB-O4JiWK1KkYl0Z_6HKtMaKRw&s"
  },
  {
    title: "Electric Toothbrush",
    price: 69.99,
    description: "Rechargeable toothbrush with multiple cleaning modes and smart timer.",
    image: "https://store.waterpik.com/cdn/shop/files/sensonic-sonic-electric-toothbrush-stw-03w020-handle.jpg?v=1759837944&width=1946"
  },
  {
    title: "Compact Air Purifier",
    price: 149.99,
    description: "Removes 99.9% of airborne particles with HEPA filtration technology.",
    image: "https://yasirelectronics.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-22-at-6.40.22-PM.jpeg"
  },
  {
    title: "Cordless Vacuum Cleaner",
    price: 199.99,
    description: "Powerful suction and lightweight design for easy cleaning.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDh6BRCv6ldor-DcUHn7YCj3c9--_dGSdllA&s"
  },
  {
    title: "Smart Home Security Camera",
    price: 89.99,
    description: "1080p HD camera with motion detection and night vision.",
    image: "https://www.telegraph.co.uk/content/dam/recommended/2025/06/12/TELEMMGLPICT000428264676_17497186867980_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpeg?imwidth=640"
  }
];






app.get('/api/products',(req,res)=>{
    res.send(Allproducts)
})


app.listen(PORT,()=>{
    console.log(`Server Running on port${PORT}`)
})