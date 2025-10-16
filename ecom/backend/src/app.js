const express = require('express');
const app = express();
const products = require('./products');
const {Allproduct} = require('./model/user')
const {connectDB} = require('./config/database')
const cors = require('cors');
// const productsAll = require('./products')
app.use(cors());
app.use(express.json());


const productsCard = [
  {
    "image": "https://images-cdn.ubuy.ae/6621c81885d4910d0a49cd4b-coofandy-men-39-s-casual-shirts.jpg",
    "title": "Wireless Headphones",
    "price": 59.99,
    "description": "High-quality over-ear wireless headphones with noise cancellation."
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0FOwGaZxl5foEn70LZgD2zUQ8cg8iBtlt0A&s",
    "title": "Smartwatch",
    "price": 89.99,
    "description": "Fitness tracking smartwatch with heart rate and sleep monitoring."
  },
  {
    "image": "https://www.acecart.pk/cdn/shop/files/5-3_5116d593-c263-41df-b9ec-a2aa9ee90ab4.jpg?v=1713606317",
    "title": "Gaming Laptop",
    "price": 1199.99,
    "description": "Powerful gaming laptop with 16GB RAM and RTX 4060 GPU."
  },
  {
    "image": "https://jbstore.pk/cdn/shop/files/Maroon.png?v=1712176163",
    "title": "Digital Camera",
    "price": 499.99,
    "description": "Capture stunning photos with a 24MP lens and 4K video recording."
  },
  {
    "image": "https://jbstore.pk/cdn/shop/files/White_w.png?v=1688759872&width=1200",
    "title": "Running Shoes",
    "price": 74.99,
    "description": "Lightweight and breathable running shoes for all-day comfort."
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs0613MuexULRokTcysYKCWKDKDN5t-MCmEaQGNQLIJrcivw-WAWz4_FGtLrmGGOOxJkU&usqp=CAU",
    "title": "Travel Backpack",
    "price": 39.99,
    "description": "Durable, water-resistant backpack with multiple compartments."
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgpdwadQQkugF5XuuiT8vW-0UcvMT79pgTOEHXuh8isnOxrzbu6TqOXmgLWXMb0a59mtc&usqp=CAU",
    "title": "Smartphone",
    "price": 699.99,
    "description": "Latest smartphone with a 120Hz AMOLED display and 5G support."
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJlH2OMyXtO970l6est52QeQpcYd9D7pHf_I-AOAE0yTs7n-aiecPu8_V-wtdrwKoI4c&usqp=CAU",
    "title": "Analog Watch",
    "price": 149.99,
    "description": "Classic stainless steel watch with a sleek, timeless design."
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi3qSMgoC9M4WSgdGFvxt4JgmNJtStjtpmu1R21J6Po51Lj1Pk-c3hNnTHWYVb-vu-2hE&usqp=CAU",
    "title": "Android Tablet",
    "price": 299.99,
    "description": "10-inch tablet perfect for reading, streaming, and browsing."
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJV4jw-zxBFsKzeXNagccg7x6m8DVeyU3IZW-yq8TOt6EcKxkf2fww56HpCDeqWFz7zsU&usqp=CAU",
    "title": "Leather Jacket",
    "price": 199.99,
    "description": "Premium leather jacket for a stylish and rugged look."
  },
  {
    "image": "https://media.rallyhouse.com/homepage/133083701-1.jpg?tx=f_auto,c_fit,w_730,h_730",
    "title": "Sunglasses",
    "price": 24.99,
    "description": "UV-protected polarized sunglasses with a modern frame."
  },
  {
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDiyn3HnDopQ4zea435SFqgCXTLWTSz-SpPTlgDz7CWBha6MsPJbZywFKZM0HKamUw-L4&usqp=CAU",
    "title": "Bluetooth Speaker",
    "price": 45.99,
    "description": "Portable Bluetooth speaker with deep bass and long battery life."
  }
];

// export default products;


// app.get('/products',async(req,res)=>{
//     try {
//         const users = await Allproduct.find({});
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// app.post('/addproduct', async (req, res) => {
//   try {
//     const { image, price, description, title } = req.body;

    
//     if (!image || !price || !description || !title) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

   
//     const data = await Allproduct.create({
//       image,
//       price,
//       description,
//       title,
//     });

// //  const data = await Allproduct.insertMany(products)

//     res.status(201).json({
//       message: "Product Added Successfully!",
//       data,
//     });
    
//   } catch (error) {
//     console.error("Error Adding Product:", error);
//     res.status(500).json({
//       message: "Error Adding Product",
//       error: error.message,
//     });
//   }
// });


app.get('/api/products',(req,res)=>{
  res.json(productsCard)
})
// console.log(productsAll)

connectDB().then(()=>{
    console.log("Database Connected")
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })
}).catch((err)=>{
    console.log("Failed to connect to database", err);
})
