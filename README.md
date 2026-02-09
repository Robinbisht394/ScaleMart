
🛒 ScaleMart – Scalable E-Commerce Backend System

A production-ready e-commerce backend built with scalability, performance, security, and real-world business logic in mind.
ScaleMart goes beyond basic CRUD APIs and focuses on how real e-commerce systems are designed and operated in production.


---

✨ Recent Updates

**[Feb 2026]** ✅ Integrated Address Management Routes
- Dedicated endpoints for user address management
- Add, retrieve, and delete addresses
- Supports multiple addresses per user

**[Feb 2026]** ✅ Integrated User & Admin Analytics Routes  
- User analytics: Order summaries and monthly spending insights
- Admin analytics: Top-selling products and order overview
- Redis-cached endpoints for optimal performance


---

🚀 Project Overview

ScaleMart is a backend system designed to simulate the core functionality of a modern e-commerce platform.
The goal of this project was not feature quantity, but clean architecture, correct data modeling, optimized APIs, and maintainable code.

The system handles:

Secure user authentication

Product and category management

Cart and order lifecycle

Payments

Analytics and insights

API documentation and validation



---

🎯 Key Objectives

Build a scalable and modular backend architecture

Follow industry best practices (service layer, validation, error handling)

Design production-level APIs (pagination, filtering, sorting, caching)

Implement real business workflows, not just CRUD

Make the project interview-ready for backend roles



---

🧱 Tech Stack

Core Technologies

Node.js

Express.js

MongoDB

Mongoose


Security & Validation

JWT Authentication

Role-Based Authorization

Zod (Schema validation)


Performance & Dev Experience

Redis (Caching)

Swagger (OpenAPI) – API documentation

Centralized Error Handling



---

🏗️ System Architecture

ScaleMart follows a layered architecture:

Client
  ↓
Routes
  ↓
Controllers  →  Input validation
  ↓
Services     →  Business logic
  ↓
Models       →  Database interaction
  ↓
MongoDB

Why this architecture?

Clear separation of concerns

Easy to test and maintain

Scales well as features grow

Mirrors real-world backend systems



---

🔐 Authentication & Authorization

JWT-based authentication

Tokens verified via middleware

Role-based access control

USER

ADMIN



Protected routes validate:

1. Token authenticity


2. User existence


3. User role permission




---

📦 Core Features

👤 User

Signup / Login

Secure password hashing

JWT token generation

Role-based access



---

🗂️ Product & Category

Product and category separation

Search, filter, sort, pagination

Optimized queries with indexes

Admin-only product management



---

🛒 Cart

One cart per user

Add/update/remove products

Quantity validation

Automatic total calculation

Atomic updates to prevent inconsistency



---

📦 Orders

Order creation from cart

Order lifecycle management

PENDING

PAID

CANCELLED

DELIVERED


Order cancellation rules

Snapshot of address and cart at order time



---

💳 Payments

Separate Payment collection

Linked with orders

Tracks:

Payment status

Payment method

Transaction reference


Designed for gateway extensibility (Stripe/Razorpay)



---

📍 Address Handling

Address captured and stored separately during checkout

Prevents data mutation issues on user address changes

Accessible via dedicated address API endpoints

Features:

Add new addresses
Retrieve all user addresses
Delete addresses




---

📊 Analytics & Insights (Aggregation Pipelines)

Implemented production-style analytics APIs using MongoDB aggregation:

User Analytics Endpoints
- Total orders and spending
- Monthly purchase summaries
- Recent order activity

Admin Analytics Endpoints
- Top selling products
- Revenue trends
- Order distribution and insights

> These APIs simulate AI-powered insights without ML overhead.
> All analytics endpoints feature Redis caching for optimal performance.




---

⚡ Performance Optimizations

Pagination on all list APIs

Indexed frequently queried fields

Redis caching for:

Product listings

Analytics endpoints


Lean queries for read-heavy APIs



---

🛡️ Security Measures

JWT authentication

Role-based authorization

Input validation using Zod

Centralized error handling

No sensitive data exposed in responses



---

📄 API Documentation

Swagger (OpenAPI) documentation

Auto-generated from routes

Clean request/response schemas

Easy to test via Swagger UI


> Designed so any developer can understand and use the APIs quickly



---

🔌 API Endpoints Reference

**Base URL:** `/api/v1`

### Authentication
- `POST /auth/register` – Create new user account
- `POST /auth/login` – Authenticate and receive JWT token


### User Management
- `GET /user` – Get user profile
- `PUT /user` – Update user profile


### Products
- `GET /products` – List all products (paginated, filterable)
- `GET /products/:id` – Get product details
- `POST /products` – Create product (ADMIN only)
- `PUT /products/:id` – Update product (ADMIN only)
- `DELETE /products/:id` – Delete product (ADMIN only)


### Categories
- `GET /categories` – List all categories
- `GET /categories/:id` – Get category details
- `POST /categories` – Create category (ADMIN only)
- `PUT /categories/:id` – Update category (ADMIN only)
- `DELETE /categories/:id` – Delete category (ADMIN only)


### Cart
- `GET /cart` – Get user's cart
- `POST /cart` – Add product to cart
- `PUT /cart/:productId` – Update product quantity in cart
- `DELETE /cart/:productId` – Remove product from cart


### Orders
- `GET /order` – Get user's orders
- `GET /order/:id` – Get order details
- `POST /order` – Create new order from cart
- `PUT /order/:id` – Update order status
- `DELETE /order/:id` – Cancel order


### Payments
- `GET /payment` – Get user's payments
- `POST /payment` – Process payment
- `GET /payment/:id` – Get payment details


### Address
- `POST /address/newaddress` – Add new address
- `GET /address` – Get all user addresses
- `POST /address/:addressId` – Delete address


### Analytics - User
- `GET /analytics/user/order-summary` – Get user's order statistics
- `GET /analytics/user/monthly-summary` – Get user's monthly spend summary


### Analytics - Admin
- `GET /analytics/admin/order-overview` – Admin overview of all orders
- `GET /analytics/admin/top-selling-product` – Get top selling products




---

🧪 Error Handling Strategy

Custom ApiError class

Consistent error responses

Async error handling wrapper

No unhandled promise rejections



---

🧠 Challenges & Solutions

Cart Consistency

Problem: Avoid duplicate products and incorrect quantities
Solution: Atomic updates and pre-checks in service layer


---

Order State Management

Problem: Prevent invalid order transitions
Solution: Controlled status updates with validation


---

Performance Bottlenecks

Problem: Slow product listing APIs
Solution: Indexing, pagination, caching


---

Feature Creep

Problem: Too many features vs quality
Solution: Stopped feature addition and focused on polish & best practices


---

📚 What I Learned

Designing real-world backend systems

Writing scalable and maintainable APIs

Handling complex business logic

Optimizing MongoDB queries

Thinking like a backend engineer, not just a coder



---

🔮 Future Improvements

Coupon and discount engine

Webhook-based payment confirmation

Advanced recommendation logic

Microservices-based scaling



---

🧑‍💻 Author

Robin Bisht
Backend Developer (Node.js, MongoDB)
Focused on scalable systems and clean architecture


---

⭐ Final Note

ScaleMart is intentionally not overloaded with features.
Instead, it reflects how real backend systems are designed, optimized, and documented in production.

> Quality over quantity. Always.