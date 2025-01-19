[View NxtTrends Site](https://nxtrends007ash.ccbp.tech/login)

<div style="text-align: center;">
  <video style="max-width:70%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12);outline:none;" loop="true" autoplay="autoplay" controls="controls" muted>
    <source src="https://assets.ccbp.in/frontend/content/react-js/nxt-trendz-cart-features-output.mp4" type="video/mp4">
  </video>
</div>
<br/>

### Design Files

<details>
<summary>Click to view</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px)](https://assets.ccbp.in/frontend/content/react-js/nxt-trendz-cart-features-sm-output-v0.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px)](https://assets.ccbp.in/frontend/content/react-js/nxt-trendz-cart-features-lg-output.png)

</details>

# Shopping Application

## 📜 Overview
The **Nxt Trends** is a dynamic and responsive web application built using **React JS**. It allows users to browse, search, and purchase items with ease. The app features a modern UI/UX and provides seamless navigation for an optimal shopping experience.

## 🌐 Pages
- **Login Page**
- 🏠 **Home Page**
- 🛍️ **Products Page**
- 📄 **Product Details Page**
- 🛒 **Cart Page**
  
---

## 🚀 Features
- **Product Listing**: Display a variety of products with details like name, price, and image.
- **Search and Filter**: Easily search for products and apply filters by category or price.
- **Add to Cart**: Add items to the cart and view the cart summary.
- **Checkout**: Place orders with a smooth and intuitive checkout process.
- **Responsive Design**: Works flawlessly on desktops, tablets, and mobile devices.

---

## 🛠️ Technologies Used
- **Frontend**: React JS, HTML, CSS, Bootstrap
- **State Management**: React State/Context API
- **Routing**: React Router
- **Storage**: Uses Local Storage to mimic backend kind of feel
- **Others**: Git (for version control) and NPM packages

---

## 📦 Production Packages

Here is the list of third-party packages used in production:

1. **@testing-library/jest-dom**: Testing library for DOM assertions.
2. **@testing-library/react**: Testing utilities for React components.
3. **@testing-library/user-event**: Simulates user interactions for testing.
4. **chalk**: Terminal string styling library.
5. **history**: Manages session history (used in routers like `react-router-dom`).
6. **js-cookie**: Simplified cookie management in JavaScript.
7. **msw**: Mock Service Worker for testing API calls.
8. **react**: Core React library for building user interfaces.
9. **react-dom**: Rendering React components into the DOM.
10. **react-icons**: Icon library for React.
11. **react-loader-spinner**: React components for loading spinners.
12. **react-router-dom**: Routing library for React applications.
13. **reactjs-popup**: Popup component library for React.

---

## 📂 Project Structure
# Project Directory

```plaintext
/src
|-- /components
|   |-- /AllProductsSection
|   |-- /Cart
|   |-- /CartItem
|   |-- /CartListView
|   |-- /CartSummary
|   |-- /EmptyCartView
|   |-- /FiltersGroup
|   |-- /Header
|   |-- /Home
|   |-- /LoginForm
|   |-- /NotFound
|   |-- /PaymentPopup
|   |-- /PrimeDealsSection
|   |-- /ProductCard
|   |-- /ProductItemDetails
|   |-- /Products
|   |-- /ProductsHeader
|   |-- /ProtectedRoute
|   |-- /SimilarProductItem
|
|-- /context
|   |-- /CartContext
|
|-- App.js
|-- App.css
|-- index.js

