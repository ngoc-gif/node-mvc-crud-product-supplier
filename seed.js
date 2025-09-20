require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/node_mvc_crud';

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Supplier.deleteMany({});
  await Product.deleteMany({});

  const s1 = await Supplier.create({ name: 'Supplier A', address: 'Hanoi', phone: '012345' });
  const s2 = await Supplier.create({ name: 'Supplier B', address: 'HCM', phone: '098765' });

  await Product.create({ name: 'Mouse', price: 10.5, quantity: 100, supplier: s1._id });
  await Product.create({ name: 'Keyboard', price: 20, quantity: 50, supplier: s2._id });

  console.log('Seed done');
  mongoose.disconnect();
}

seed().catch(e => { console.error(e); mongoose.disconnect(); });
