//const express =require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({}); // empty object means that -->
    // --> it will fetch all the products from the db
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error in fetching products:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.post('/api/products', async (req, res) => {
  const product = req.body; //user will send this data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save(); //save the product to the db
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error in create product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: 'Product id  not found' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Error in updating product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Error in deleting product:', error.message);
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

//postman desktop app to test our server

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log('server started at http://localhost:5000');
});

// {
//   "name": "Smart watch",
//   "price": "199.99",
//   "image": "example.com/image"
// }
