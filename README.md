# ScholarKit 🎓
### Multi-Vendor E-Commerce Database System

ScholarKit is a comprehensive full-stack solution for school uniform procurement, built to demonstrate advanced DBMS concepts including ACID transactions, stored procedures, triggers, and analytical views.

---

## 🚀 Getting Started

### 1. Prerequisites
- **MySQL 8.0+**
- **Node.js 18+**
- **Cloudinary Account** (for image uploads)
- **Razorpay Account** (for test payments)

### 2. Database Setup
1. Create a MySQL database named `scholarkit_dbms`.
2. To completely generate the schema and seed the live database for demo purposes, run the following scripts from the root directory:
   ```bash
   mysql -u root -p scholarkit_dbms < scripts/demo_wipe.sql
   node scripts/demo_seed.js
   mysql -u root -p scholarkit_dbms < scripts/demo_preload.sql
   mysql -u root -p scholarkit_dbms < scripts/migration_v2.sql
   ```

### 3. Backend Configuration
Create a `.env` file in the `backend/` directory:
```env
DB_HOST=127.0.0.1
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=scholarkit_dbms
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. Installation & Launch
```bash
# Install backend dependencies and launch API Server
cd backend
npm install
npm run dev

# In a new terminal, install frontend dependencies and launch Web App
cd frontend
npm install
npm run dev
```

---

## 🛠️ Advanced Database Features

| Feature | Implementation | Purpose |
| :--- | :--- | :--- |
| **ACID Transactions** | `PlaceOrder` Stored Procedure | Includes `ROLLBACK` error handlers ensuring atomic checkouts and safe stock deducts. |
| **SQL Cursors** | `CalculateTotalInventoryValue` | Loop-based total inventory valuation logic via `product_cursor`. |
| **Triggers** | `before_product_price_update`<br>`after_stock_depletion` | Auto logs price changes for auditing.<br>Auto inserts low-stock dashboard notifications. |
| **Window Functions** | `vw_top_products_per_school` | Analytical ranking of products without complex app-logic. |
| **Views** | `vw_user_recommendations` | Smart personalized recommendation engine using embedded subqueries. |
| **Normalization** | 3rd Normal Form (3NF) | 100% normalized relational database architecture reducing redundancy. |

---

## 🔗 References & Credits
- **UI Design:** Inspired by modern B2C platforms (Zappos, Nike).
- **Security:** Follows [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/) for JWT and hashing.
- **Database:** Standard SQL patterns from [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/).
- **Icons:** [Lucide React](https://lucide.dev/).
- **Toast Notifications:** [React Hot Toast](https://react-hot-toast.com/).
