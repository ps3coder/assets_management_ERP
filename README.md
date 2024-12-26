---

### **Mini ERP System for Product Management**  
**Objective:** Develop a Mini ERP System for managing products, sales orders, and sales summary reports using Next.js and PostgreSQL.

#### **Project Setup**  
1. Initialize a new **Next.js** project.  
2. Install dependencies:  
   ```bash
   npm install prisma @prisma/client react-hook-form next-auth chart.js axios
   ```
3. Set up **Prisma** for database schema management and connect to a **PostgreSQL** database.

---

### **Master: Product Management**

#### Database Schema:

Define the `products` table with the following fields:

- `id`: UUID, Primary Key
- `name`: String
- `description`: Text
- `price`: Decimal
- `quantity`: Integer
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### API Routes:

- `GET /api/products` - List all products.
- `GET /api/products/[id]` - Get details of a single product.
- `POST /api/products` - Create a new product.
- `PUT /api/products/[id]` - Update a product.
- `DELETE /api/products/[id]` - Delete a product.

#### React Components:

- **Product List Page**: Display all products.
- **Product Detail Page**: Show details of a selected product.
- **Product Form**: Handle product creation and editing.

---

### **Transaction: Sales Order**

#### Database Schema:

**Sales Orders Table:**

- `id`: UUID, Primary Key
- `order_date`: Date
- `customer_name`: String
- `total_amount`: Decimal
- `status`: Enum (`pending`, `completed`, `cancelled`)
- `created_at`: Timestamp
- `updated_at`: Timestamp

**Sales Order Items Table:**

- `id`: UUID, Primary Key
- `sales_order_id`: UUID, Foreign Key
- `product_id`: UUID, Foreign Key
- `quantity`: Integer
- `unit_price`: Decimal
- `total_price`: Decimal

#### API Routes:

- `POST /api/sales-orders` - Create a new sales order.
- `GET /api/sales-orders` - List all sales orders.
- `GET /api/sales-orders/[id]` - Get details of a sales order (with items).
- `PUT /api/sales-orders/[id]` - Update sales order status.

#### React Components:

- **Sales Order Form**: Create sales orders with product selection.
- **Sales Order List Page**: Display all sales orders.
- **Sales Order Detail Page**: View details of a specific sales order.

---

### **Report: Sales Summary**

#### API Route:

`GET /api/reports/sales-summary` - Generate a sales summary including:

- Total orders count.
- Total sales amount.
- Top 5 selling products (by quantity and revenue).
- Sales breakdown by status (`pending`, `completed`, `cancelled`).

#### React Component:

- **Sales Summary Page**:
  - Show data using tables and charts.
  - Use a library like **Chart.js** for visualizations.

---

### **Final Tasks**

- Input validation and error handling in both frontend and backend.
- Add basic styling for a user-friendly UI (e.g., Tailwind CSS or CSS Modules).
- Ensure all components and API routes work seamlessly.

---

### **Bonus Tasks (Optional)**

1. **User Authentication:**
   - Implement login/logout with NextAuth.js.
2. **Pagination:**
   - Add pagination for products and sales orders.
3. **Dashboard:**
   - Create a dashboard summarizing key metrics like total products, sales, and pending orders.

**Pro Tip:** Focus on modular code, reusable components, and clear API design for optimal results.

---

<!-- DOCS -->

- Run `npx prisma migrate dev` to create the database schema.
- Run `npx prisma generate` to generate the Prisma client.

my-app/
├── prisma/
│ └── schema.prisma # Prisma schema
├── pages/
│ ├── api/
│ │ ├── products/
│ │ │ ├── index.js # Product CRUD API
│ │ │ └── [id].js # Single Product API
│ │ ├── sales-orders/
│ │ │ ├── index.js # Sales Orders CRUD API
│ │ │ └── [id].js # Single Sales Order API
│ │ └── reports/
│ │ └── sales-summary.js # Sales Summary API
│ ├── products/
│ │ ├── index.js # Product List Page
│ │ └── [id].js # Product Detail Page
│ ├── sales-orders/
│ │ └── index.js # Sales Orders Form Page
│ └── reports/
│ └── sales-summary.js # Sales Summary Page
├── components/
│ ├── ProductList.js # Product list component
│ ├── ProductDetail.js # Product detail component
│ ├── SalesOrderForm.js # Sales order form component
│ └── SalesSummary.js # Sales summary chart component
├── lib/
│ └── prisma.js # Prisma client instance
├── services/
│ ├── productService.js # Product-related DB logic
│ ├── salesOrderService.js# Sales order-related DB logic
│ └── reportService.js # Report-related DB logic
├── styles/
│ └── globals.css # Global styles
├── public/ # Static files (e.g., images)
├── .env # Environment variables
├── next.config.js # Next.js configuration
├── tailwind.config.js # Tailwind configuration (if using Tailwind)
├── package.json # NPM dependencies and scripts
└── README.md # Project documentation

1. **`prisma/schema.prisma`**: Defines models for `Product`, `SalesOrder`, and `SalesOrderItem` using Prisma with relations.
2. **`pages/api/products/index.js` (CRUD API)**: Handles product listing (GET) and creation (POST) with Prisma.
3. **`pages/api/products/[id].js` (Single Product API)**: Fetches a single product by its ID (GET).
4. **`pages/api/sales-orders/index.js` (CRUD API)**: Handles sales orders, including listing with related items (GET) and creating with associated items (POST).
5. **`pages/api/sales-orders/[id].js` (Single Sales Order API)**: Fetches details of a specific sales order by ID (GET).
6. **`pages/api/reports/sales-summary.js`**: Generates a summary report of sales, including aggregates like total amount and count, grouped by status.

7. **`pages/products/index.js`**: Displays a list of products fetched from the `/api/products` endpoint with error handling and loading state.
8. **`pages/products/[id].js`**: Fetches and displays details of a single product by its ID from `/api/products/[id]`.
9. **`pages/sales-orders/index.js`**:
   - Displays sales orders with the ability to fetch all orders from `/api/sales-orders`.
   - Includes a form (`SalesOrderForm` component) to create new sales orders via a POST request.
10. **`pages/reports/sales-summary.js`**: Uses the `SalesSummary` component to display a sales summary report.

11. **`components/ProductList.js`**: Fetches a list of products from the API using `axios` and displays them in a list format.
12. **`components/ProductDetail.js`**: Fetches and displays details of a single product by its ID using `axios`.
13. **`components/SalesOrderForm.js`**: A form component for creating new sales orders. Submits customer name, total amount, and items via POST request.
14. **`components/SalesSummary.js`**: Fetches and displays a summary of sales orders with data grouped by status, including total amount and order count.

15. **`lib/prisma.js`**: Initializes and exports the Prisma client for database operations.
16. **`services/productService.js`**: Provides functions for managing products, including:
    - Fetching all products.
    - Fetching a product by ID.
    - Creating, updating, and deleting products.
17. **`services/salesOrderService.js`**: Offers functions for managing sales orders, such as:
    - Fetching all sales orders (with items included).
    - Fetching a sales order by ID (with items included).
    - Creating, updating, and deleting sales orders.
18. **`services/reportService.js`**: Includes a function to fetch a sales summary grouped by status, with aggregated totals and counts.
