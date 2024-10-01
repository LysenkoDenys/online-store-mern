//const express =require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.post('/products', async (req, res) => {
  const product = req.body; //user will send this data
  if (!product.name || !product.price || !product.image) {
  }
});

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log('server started at http://localhost:5000');
});
