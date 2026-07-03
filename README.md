<div align="center">
  <h1>🎓 ScholarKit</h1>
  <p><strong>Multi-Vendor E-Commerce Database System for School Uniforms & Essentials</strong></p>
  
  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white" alt="React 19" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-Express-green?logo=node.js&logoColor=white" alt="Node.js" /></a>
    <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-8.0+-blue?logo=mysql&logoColor=white" alt="MySQL 8.0+" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  </p>
</div>

---

## 📖 About The Project

**ScholarKit** is a full-stack, multi-vendor e-commerce platform engineered specifically to streamline the procurement of school uniforms and educational essentials. It bridges the gap between authorized uniform vendors and parents, providing a centralized and secure shopping experience. 

Built with a focus on **data integrity, scalability, and performance**, ScholarKit demonstrates advanced **Relational Database Management System (DBMS)** concepts. The backend handles complex transaction processing and business logic natively in SQL, while the frontend delivers a sleek, modern, and highly responsive user interface built with React 19 and Tailwind CSS.

## 🎯 Technical Competencies & Skills Demonstrated

- **Advanced Database Design:** 3NF Normalization, Vertical Partitioning, and materializing complex product feeds using Views and Subqueries.
- **Transaction Management:** ACID-compliant operations utilizing MySQL Stored Procedures with automatic `ROLLBACK` handling for atomic checkout flows.
- **Full-Stack Architecture:** RESTful API design with Node.js/Express and a scalable React frontend managed by the Context API.
- **Secure Authentication & Authorization:** JWT-based stateless authentication paired with secure password hashing (`bcryptjs`) for separate Parent and Vendor roles.
- **Cloud Infrastructure & Integrations:** Direct integration with Cloudinary for scalable image hosting and Razorpay for secure payment processing.

---

## ✨ Key Features

- **Multi-Vendor Ecosystem**: Dedicated seller dashboards empower authorized uniform vendors to manage their inventory, media galleries, and sales analytics. Simultaneously, parents enjoy a unified storefront to purchase required apparel and gear.
- **Automated Inventory & Price Auditing**: Database-level Triggers (`BEFORE UPDATE`, `AFTER UPDATE`) automatically log price changes and generate low-inventory alerts without relying on application-layer logic.
- **Complex Analytics via SQL**: Utilizing Common Table Expressions (CTEs) and Window Functions (`ROW_NUMBER()`) to dynamically compute leaderboards, such as the top-selling products per school.
- **Secure Media Management**: Cloudinary integration ensures vendor product images are compressed, optimized, and securely served across the platform.

---

## 🛠️ Technology Stack

### 🎨 Frontend
- **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Routing & State**: React Router v7, React Context API
- **Styling**: Tailwind CSS 3.4, Framer Motion
- **Icons & Network**: Lucide React, Axios

### ⚙️ Backend
- **Server Environment**: Node.js, Express.js
- **Database Engine**: MySQL 8.0+
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Services**: Cloudinary SDK (Media), Razorpay SDK (Payments)

---

## 🧠 Advanced Database Features (MySQL 8.0+)

ScholarKit relies on the DBMS engine not just for storage, but for complex business logic, ensuring absolute consistency at the data level:

| Feature | Implementation Highlights |
| :--- | :--- |
| **3NF Normalization & Vertical Partitioning** | Schema adheres to Third Normal Form (3NF). Vertical partitioning isolates auth credentials (`users`) from business metadata (`sellers`), preventing sparse data. |
| **ACID Transactions & Procedures** | Order checkout is encapsulated in a `PlaceOrder` Stored Procedure, using a `START TRANSACTION` block with an `EXIT HANDLER` for automatic `ROLLBACK`s if any step fails. |
| **Advanced Views & Subqueries** | Complex feeds are materialized in the database. E.g., `vw_user_recommendations` builds personalized feeds using multi-table JOINs and subqueries. |
| **Window Functions & CTEs** | The Admin Dashboard leaderboard (`vw_top_products_per_school`) utilizes Common Table Expressions (CTEs) and `ROW_NUMBER()` Window Functions to rank products natively. |
| **SQL Cursors** | The `CalculateTotalInventoryValue` procedure uses an explicit SQL `CURSOR` for row-by-row inventory processing during administrative audits. |
| **Event-Driven Triggers** | Data integrity is automated: an `AFTER UPDATE` trigger generates low-inventory alerts, and a `BEFORE UPDATE` trigger logs automated price-change audits. |
| **Set Deduplication** | Media Library enforces asset uniqueness by applying `SELECT DISTINCT` with parameterized `WHERE` clauses for isolated seller galleries. |

---

## 🏗️ Architecture & Directory Structure

### Frontend (`/frontend`)
The frontend is built for performance and maintainability, employing a clean structure:
- **`src/pages/`**: Top-level views (e.g., `AdminDashboard.jsx`, `SellerDashboard.jsx`, `Home.jsx`) that manage data fetching.
- **`src/components/`**: Reusable, consistent UI components (buttons, modals, product cards) adhering to DRY principles.
- **`src/context/`**: Global state management (Context API) for auth, cart, and preferences without prop-drilling.
- **`src/utils/`**: Helper functions, formatters, and API client wrappers.

### Backend (`/backend`)
A RESTful API built with Express, providing secure endpoints to interact with the database, process payments, and manage media.

---

## 🚀 Getting Started

Follow these instructions to get the ScholarKit application running on your local machine.

### Prerequisites

Ensure you have the following installed:
- **MySQL 8.0+**
- **Node.js** (v16 or higher)
- **Cloudinary Account** (for image hosting)
- **Razorpay Account** (for payments)

### 1. Database Setup
From the project root, execute the SQL and seed scripts to initialize the database:

```bash
# Wipe existing demo database (if any)
mysql -u root -p < scripts/demo_wipe.sql

# Preload the schema, baseline views, triggers, and functions
mysql -u root -p < scripts/demo_preload.sql

# Apply the v2 Migration (Discounts, Recommendations, Procedures)
mysql -u root -p < scripts/migration_v2.sql

# Seed the database with sample data (users, sellers, products)
node scripts/demo_seed.js
```

### 2. Backend Setup
Navigate to the `backend` directory, install dependencies, and setup your `.env`:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=scholarkit
JWT_SECRET=your_jwt_secret

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay Config
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

Start the backend server:
```bash
npm start
# or use nodemon for development:
# npx nodemon server.js
```

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the ISC License.

## 📚 Credits & References

- [React](https://react.dev/) & [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/)
- [Lucide React Icons](https://lucide.dev/)
- [Cloudinary API Documentation](https://cloudinary.com/documentation)
- [Razorpay Developer Docs](https://razorpay.com/docs/)
