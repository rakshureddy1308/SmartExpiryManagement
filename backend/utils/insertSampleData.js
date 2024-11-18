const mongoose = require("mongoose");
const Product = require("./productSchema"); // Assuming your model is in this path

// MongoDB Connection URI
mongoose
  .connect("mongodb+srv://admin:admin123@cluster0.zhv4b.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Sample products data
    const sampleProducts = [
      {
        name: "Apple Juice",
        price: 5.5,
        expiryDate: "2024-11-25",
        stock: 50,
        sales: 120,
        category: "A",
      },
      {
        name: "Orange Juice",
        price: 4.0,
        expiryDate: "2024-12-10",
        stock: 30,
        sales: 80,
        category: "B",
      },
      {
        name: "Banana Chips",
        price: 2.5,
        expiryDate: "2024-11-30",
        stock: 100,
        sales: 150,
        category: "A",
      },
      {
        name: "Milk",
        price: 3.0,
        expiryDate: "2024-11-20",
        stock: 20,
        sales: 200,
        category: "C",
      },
      {
        name: "Almonds",
        price: 8.0,
        expiryDate: "2025-05-15",
        stock: 150,
        sales: 50,
        category: "B",
      },
      {
        name: "Cashews",
        price: 7.5,
        expiryDate: "2025-01-10",
        stock: 80,
        sales: 60,
        category: "C",
      },
      {
        name: "Whole Wheat Bread",
        price: 3.5,
        expiryDate: "2024-11-22",
        stock: 120,
        sales: 170,
        category: "A",
      },
      {
        name: "Rice",
        price: 2.0,
        expiryDate: "2025-06-01",
        stock: 300,
        sales: 500,
        category: "C",
      },
      {
        name: "Spaghetti",
        price: 1.5,
        expiryDate: "2025-07-01",
        stock: 200,
        sales: 100,
        category: "B",
      },
      {
        name: "Cheese",
        price: 6.0,
        expiryDate: "2024-11-28",
        stock: 40,
        sales: 90,
        category: "A",
      },
    ];

    // Insert sample data into the database
    Product.insertMany(sampleProducts)
      .then(() => {
        console.log("Sample products inserted");
        mongoose.disconnect();
      })
      .catch((err) => {
        console.error("Error inserting sample products:", err);
        mongoose.disconnect();
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
