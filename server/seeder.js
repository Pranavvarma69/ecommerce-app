const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");
const products = require("./data/products");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await Product.deleteMany(); // Clear previous data
    await Product.insertMany(products); // Seed new data

    console.log("Data seeded successfully!");
    process.exit();
  })
  .catch((error) => {
    console.error("Seeding error:", error);
    process.exit(1);
  });