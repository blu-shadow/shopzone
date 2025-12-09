const express = require('express');
const cors = require('cors');
const { join } = require('path');
const { Low, JSONFile } = require('lowdb');

const app = express();
app.use(cors());
app.use(express.json());

// simple file DB using lowdb
const file = join(__dirname, 'data.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDB(){
  await db.read();
  db.data = db.data || { products: [], cart: [] };
  if(!db.data.products || db.data.products.length === 0){
    db.data.products = [
      {id:1,name:"Men's Casual Shirt",price:1200,image:'https://placehold.co/600x600/e0f2fe/0c4a6e?text=Casual+Shirt',desc:'Comfortable cotton shirt for daily wear.'},
      {id:2,name:"Women's Summer Dress",price:2500,image:'https://placehold.co/600x600/fce7f3/831843?text=Summer+Dress',desc:'Light floral dress perfect for summer.'},
      {id:3,name:"Wireless Bluetooth Headphones",price:4500,image:'https://placehold.co/600x600/e0e7ff/3730a3?text=Headphones',desc:'High fidelity sound and long battery.'},
      {id:4,name:"Leather Crossbody Bag",price:3200,image:'https://placehold.co/600x600/fef3c7/78350f?text=Crossbody+Bag',desc:'Chic and durable with multiple pockets.'},
      {id:5,name:"Smartphone Pro",price:65000,image:'https://placehold.co/600x600/d1fae5/064e3b?text=Smartphone',desc:'120Hz display and triple camera.'},
      {id:6,name:"Coffee Maker",price:3800,image:'https://placehold.co/600x600/e5e7eb/1f2937?text=Coffee+Maker',desc:'Brews up to 12 cups, programmable.'},
      {id:7,name:"Running Shoes",price:5200,image:'https://placehold.co/600x600/fee2e2/991b1b?text=Running+Shoes',desc:'Lightweight and breathable.'},
      {id:8,name:"Gaming Mouse",price:2800,image:'https://placehold.co/600x600/f3e8ff/581c87?text=Gaming+Mouse',desc:'High precision with programmable buttons.'}
    ];
    await db.write();
  }
}

initDB();

// GET /api/products
app.get('/api/products', async (req, res) => {
  await db.read();
  res.json(db.data.products || []);
});

// GET /api/cart
app.get('/api/cart', async (req, res) => {
  await db.read();
  res.json(db.data.cart || []);
});

// POST /api/cart  { id, quantity }
app.post('/api/cart', async (req, res) => {
  const { id, quantity } = req.body || {};
  if(!id) return res.status(400).send('Missing id');
  await db.read();
  const prod = (db.data.products || []).find(p => p.id === id);
  if(!prod) return res.status(404).send('Product not found');
  const existing = (db.data.cart || []).find(i => i.id === id);
  if(existing) existing.quantity = (existing.quantity || 1) + (quantity || 1);
  else db.data.cart.push({...prod, quantity: quantity || 1});
  await db.write();
  res.json(db.data.cart);
});

// PUT /api/cart  body: full cart array
app.put('/api/cart', async (req, res) => {
  const body = req.body || [];
  db.data.cart = body;
  await db.write();
  res.json(db.data.cart);
});

// DELETE /api/cart/:id
app.delete('/api/cart/:id', async (req, res) => {
  const id = Number(req.params.id);
  await db.read();
  db.data.cart = (db.data.cart || []).filter(i => i.id !== id);
  await db.write();
  res.json(db.data.cart);
});

// Serve static (optional) -- useful if you build the static frontend into server/public
app.use(express.static(join(__dirname, '..', 'public')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`ShopZone server running on http://localhost:${PORT}`));
