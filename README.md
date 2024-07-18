# MERN Stack eCommerce Application

Welcome to the MERN Stack eCommerce Application repository! This project demonstrates the step-by-step creation of a full-fledged eCommerce application using the MERN stack - MongoDB, Express, React, and Node.js.

## Table of Contents

- [MERN Stack eCommerce Application](#mern-stack-ecommerce-application)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Setup and Installation](#setup-and-installation)
  - [Folder Structure](#folder-structure)
    - [1\_Intro\_to\_nodeJS](#1_intro_to_nodejs)
    - [2\_Intro\_to\_express](#2_intro_to_express)
    - [3\_Middlewares\_Intro\_to\_mongodb](#3_middlewares_intro_to_mongodb)
    - [4\_Mongoose\_CURD\_in\_DB\_With\_Factory\_DP\_](#4_mongoose_curd_in_db_with_factory_dp_)
    - [5\_Mongodb\_Queries\_Product\_Data\_With\_Pagination](#5_mongodb_queries_product_data_with_pagination)
    - [6\_Pagination\_Sort\_Filter\_Searching\_Aliasing](#6_pagination_sort_filter_searching_aliasing)
    - [7\_Cookies\_its\_usecases\_auth\_jwt\_signup\_login\_logout](#7_cookies_its_usecases_auth_jwt_signup_login_logout)
    - [8\_signup\_login\_protect\_route\_getUser\_SendEmail](#8_signup_login_protect_route_getuser_sendemail)
    - [9\_Send\_Dynamic\_Email\_forget\_\&\_reset\_password](#9_send_dynamic_email_forget__reset_password)
    - [10\_Ecommerce\_Project\_checkout\_razorpay\_payment](#10_ecommerce_project_checkout_razorpay_payment)
    - [11\_Payment\_verfication\_Razorpay\_Web\_integration](#11_payment_verfication_razorpay_web_integration)
    - [12\_Security](#12_security)
    - [13\_Security\_CORS\_E-commerce\_Integration](#13_security_cors_e-commerce_integration)
    - [14\_Websocket](#14_websocket)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This project is an eCommerce application built using the MERN stack. The application includes functionalities such as product listings, user authentication, cart management, order processing, and payment integration. The project is structured in a modular way, demonstrating the implementation of each feature step-by-step.

## Setup and Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/smbsp/MERN-eCommerce.git
    cd MERN-eCommerce
    ```

2. **Install dependencies for both the server and client**:
    ```sh
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    RAZORPAY_KEY_ID=<your_razorpay_key_id>
    RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    ```

## Folder Structure

### 1_Intro_to_nodeJS

- **Objective**: Introduction to Node.js and setting up the initial server.
- **Details**: Setting up a basic Node.js server using Express. Understanding the basics of Node.js and its event-driven architecture.

### 2_Intro_to_express

- **Objective**: Further introduction to server-side development.
- **Details**: Enhancing the basic server setup. Adding more routes and middleware for better understanding.

### 3_Middlewares_Intro_to_mongodb

- **Objective**: Introduction to middlewares and MongoDB.
- **Details**: Setting up MongoDB with Mongoose. Understanding middlewares in Express and how they work.

### 4_Mongoose_CURD_in_DB_With_Factory_DP_

- **Objective**: CRUD operations using Mongoose.
- **Details**: Implementing Create, Read, Update, and Delete (CRUD) operations in MongoDB using Mongoose. Introduction to the Factory Design Pattern for organizing code.

### 5_Mongodb_Queries_Product_Data_With_Pagination

- **Objective**: Advanced MongoDB queries and pagination.
- **Details**: Writing complex queries to filter, sort, and paginate product data.

### 6_Pagination_Sort_Filter_Searching_Aliasing

- **Objective**: Comprehensive data handling.
- **Details**: Implementing pagination, sorting, filtering, and aliasing for a seamless user experience.

### 7_Cookies_its_usecases_auth_jwt_signup_login_logout

- **Objective**: User authentication with JWT and cookies.
- **Details**: Setting up user authentication using JWT tokens stored in cookies. Implementing signup, login, and logout functionalities.

### 8_signup_login_protect_route_getUser_SendEmail

- **Objective**: Protected routes and user email functionalities.
- **Details**: Protecting routes using JWT authentication. Implementing email functionalities for user actions.

### 9_Send_Dynamic_Email_forget_&_reset_password

- **Objective**: Password management.
- **Details**: Implementing functionalities to send dynamic emails for password reset. Allowing users to reset their passwords securely.

### 10_Ecommerce_Project_checkout_razorpay_payment

- **Objective**: Checkout process and payment integration.
- **Details**: Implementing the checkout process and integrating Razorpay for payments.

### 11_Payment_verfication_Razorpay_Web_integration

- **Objective**: Payment verification.
- **Details**: Verifying payments using Razorpay’s webhooks and integrating the payment confirmation into the application.

### 12_Security

- **Objective**: Application security.
- **Details**: Enhancing security by implementing best practices. Preventing common vulnerabilities and ensuring data protection.

### 13_Security_CORS_E-commerce_Integration

- **Objective**: CORS and additional security measures.
- **Details**: Setting up CORS to manage cross-origin requests. Implementing additional security measures for a robust application.

### 14_Websocket

- **Objective**: Real-time communication.
- **Details**: Using WebSockets for real-time communication features in the application.

## Contributing

Contributions are welcome! If you have improvements or additional features to add, please submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
