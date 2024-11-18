# SmartExpiryManagement


This application displays product details and provides the ability to update stock levels. Each product has a corresponding QR code, which, when scanned, displays the product details.

## Prerequisites

Before running this app locally, ensure that you have the following software installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB Atlas account** (for database) or **MongoDB installed locally**
- **Git**: [Download Git](https://git-scm.com/)


1. **Clone the Repository**

   Clone the project repository to your local machine using Git:

   ```bash
   git clone https://github.com/rakshureddy1308/SmartExpiryManagement.git
   cd SmartExpiryManagement


# Smart Expiry Management System

This project aims to efficiently manage inventory and discounts for products based on their expiry dates, categorized using the ABC categorization system and sales velocity. The system also automates email notifications for products nearing expiry and generates QR codes for product tracking.

## Features

- **ABC Categorization Logic**: Products are categorized into three groups based on their importance, sales velocity, and contribution to revenue.
  - **Category A (Critical Items)**: High-value, fast-selling products that contribute significantly to revenue.
  - **Category B (Moderate Importance Items)**: Medium-value products that sell moderately and contribute to a balanced revenue stream.
  - **Category C (Low Priority Items)**: Low-value, slow-moving products that contribute minimally to revenue.
  
- **Discount Logic Based on Expiry**: Discounts are applied based on the product’s expiry date and category.
  - **Fast-Selling Products**: Discount rates vary depending on how near the expiry is, starting with small discounts early on, and increasing discounts as expiry nears.
  - **Slow-Selling Products**: Higher discounts are applied earlier to avoid wastage.
  
- **Automated Email Notifications**: When a product is nearing expiry, an email is sent to the relevant personnel to notify them of the discount and stock status.
  
- **QR Code Generation**: A unique QR code is generated for each product, which links to the product’s details page.

# ABC Categorization Logic
The ABC categorization logic is integrated into the system to manage product inventory and discounts. Here's how it works:

## Category A (Critical Items)
Characteristics: High-value, fast-selling products that contribute 70-80% of total revenue.
Discount Logic:
Early expiry (within 30 days): Apply a small discount (10%).
Critical expiry (1–2 weeks): Apply a higher discount (30%).
## Category B (Moderate Importance Items)
Characteristics: Medium-value products with moderate sales.
Discount Logic:
Early expiry (within 30 days): Apply a moderate discount (20%).
Critical expiry (1–2 weeks): Apply a higher discount (40%).
## Category C (Low Priority Items)
Characteristics: Low-value, slow-moving products that contribute less than 10% to revenue.
Discount Logic:
Early expiry (within 30 days): Apply a higher discount (50%).
Critical expiry (1–2 weeks): Apply an aggressive discount (70%).

## Discount Calculation Based on Sales Velocity
The system also integrates sales velocity to determine the appropriate discount:

Fast-Selling Products:
Early expiry (within 1 month): Apply a small discount (10-20%).
Very near expiry (1-2 weeks): Apply moderate discounts (20-30%).
Slow-Selling Products:
Early expiry (within 1 month): Apply a moderate discount (30-40%).
Very near expiry (1-2 weeks): Apply aggressive discounts (50-70%).


