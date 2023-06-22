const express = require('express');
const mongoose = require('mongoose');

// Create an instance of Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://diamond_2004k:rvupassword@cluster0.bgjdxtf.mongodb.net/shops1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Shop schema
const shopSchema = new mongoose.Schema({
  name: String,
  rent: Number,
});

// Create the Shop model
const Shop = mongoose.model('Shop', shopSchema);

// ShoppingComplex class
class ShoppingComplex {
  constructor() {
    this.shops = [];
  }

  async addShop(shop) {
    const newShop = new Shop(shop);
    await newShop.save();
    this.shops.push(newShop);
  }

  async calculateTotalRent() {
    let totalRent = 0;
    const shops = await Shop.find();
    shops.forEach((shop) => {
      totalRent += shop.rent;
    });
    return totalRent;
  }
}

const shoppingComplex = new ShoppingComplex();

// POST /shops - Add a shop
app.post('/shops', async (req, res) => {
  const { name, rent } = req.body;
  const shop = { name, rent };

  try {
    await shoppingComplex.addShop(shop);
    res.status(201).json({ message: 'Shop added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add shop.' });
  }
});

// app.get("/shops", async (req, res) => {
//   res.json({ShoppingComplex});
// });

// GET /shops/total-rent - Calculate total rent of all shops
app.get('/shops', async (req, res) => {
  try {
    const totalRent = await shoppingComplex.calculateTotalRent();
    res.json({ totalRent });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate total rent.' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
