const express = require('express');
const app = express();
const products = require('./products');
const {Allproduct} = require('./model/user')
const {connectDB} = require('./config/database')
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.get('/products',async(req,res)=>{
    try {
        const users = await Allproduct.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/addproduct', async (req, res) => {
  try {
    const { image, price, description, title } = req.body;

    
    if (!image || !price || !description || !title) {
      return res.status(400).json({ message: "All fields are required!" });
    }

   
    const data = await Allproduct.create({
      image,
      price,
      description,
      title,
    });

//  const data = await Allproduct.insertMany(products)

    res.status(201).json({
      message: "Product Added Successfully!",
      data,
    });
    
  } catch (error) {
    console.error("Error Adding Product:", error);
    res.status(500).json({
      message: "Error Adding Product",
      error: error.message,
    });
  }
});


connectDB().then(()=>{
    console.log("Database Connected")
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })
}).catch((err)=>{
    console.log("Failed to connect to database", err);
})
