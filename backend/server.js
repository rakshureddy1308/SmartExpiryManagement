const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const Product = require("./models/Product");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://admin:admin123@cluster0.zhv4b.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "venomous202003@gmail.com",
    pass: "zgeh kjet mbjq oyrz",
  },
});

// Determine Category Based on Sales Velocity
const getCategory = (product) => {
  // Example assumptions:
  // - Fast-Selling if sold more than 500 units in a month
  // - Moderate-Selling if sold between 100 and 500 units
  // - Slow-Selling if sold less than 100 units

  if (product.salesVelocity > 500) {
    return "A"; // Category A (Critical)
  } else if (product.salesVelocity > 100) {
    return "B"; // Category B (Moderate)
  } else {
    return "C"; // Category C (Low Priority)
  }
};

// Calculate Discount Based on Category and Expiry Date
const calculateDiscount = (product) => {
  const category = getCategory(product);
  const expiryDate = new Date(product.expiryDate);
  const currentDate = new Date();
  const timeDiff = expiryDate - currentDate;
  const daysToExpiry = Math.floor(timeDiff / (1000 * 3600 * 24));

  let discount = 0;

  // Apply discount logic based on category and expiry date
  if (category === "A") {
    if (daysToExpiry <= 7) {
      discount = 30; // Near expiry for Category A
    } else if (daysToExpiry <= 30) {
      discount = 10; // Early expiry for Category A
    }
  } else if (category === "B") {
    if (daysToExpiry <= 7) {
      discount = 40; // Near expiry for Category B
    } else if (daysToExpiry <= 30) {
      discount = 20; // Early expiry for Category B
    }
  } else if (category === "C") {
    if (daysToExpiry <= 7) {
      discount = 70; // Near expiry for Category C
    } else if (daysToExpiry <= 30) {
      discount = 50; // Early expiry for Category C
    }
  }

  return discount;
};

// Check if expiry is near (within 30 days)
const isExpiryNear = (expiryDate) => {
  const currentDate = new Date();
  const dateDiff = new Date(expiryDate) - currentDate;
  return dateDiff <= 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
};

// Send email notification
const sendExpiryEmail = (product) => {
  const mailOptions = {
    from: "venomous202003@gmail.com",
    to: "rakshureddy1308@gmail.com",
    subject: `Discount Alert: ${product.name}`,
    text: `Hello,\n\nThe product ${product.name} (Category: ${product.category}) is nearing expiry on ${product.expiryDate}. Please apply a discount of ${product.discount}% to it.\n\nThank you!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// API to get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// API to update product stock and discount
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const product = await Product.findById(id);
    product.stock = stock;
    product.discount = calculateDiscount(product);
    product.category = getCategory(product); // Assign the category

    await product.save();

    // Send expiry email if near expiry
    if (isExpiryNear(product.expiryDate)) {
      sendExpiryEmail(product);
    }

    // Generate new QR code URL
    QRCode.toDataURL(
      `http://localhost:3000/product/${product._id}`,
      (err, url) => {
        if (err) throw err;
        product.qrCodeUrl = url;
        product.save().then(() => {
          res.json(product);
        });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
