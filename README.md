### **Mini ERP System for Product Management**

This project is a Mini ERP System designed to manage products, sales orders, and sales summary reports. Built with **Next.js**, **PostgreSQL**, and **Prisma**, the system provides efficient tools for inventory and order management with a seamless user interface.

---

### **Features**

1. **Product Management**

   - CRUD operations for products.
   - View product details and update inventory.

2. **Sales Order Management**

   - Create and manage sales orders with multiple items.
   - Track orders by status (`pending`, `completed`, `cancelled`).

3. **Sales Summary Reporting**

   - Aggregated sales reports with totals and breakdown by status.
   - Visualized data using charts for better insights.

4. **Backend with Prisma**

   - PostgreSQL as the database.
   - Prisma ORM for schema management and queries.

5. **Frontend with Next.js**
   - Dynamic pages for products, orders, and reports.
   - Reusable components for enhanced modularity.

---

### ScreenShots

• Sales Order Page Screenshot ![Sales Order Page Screenshot](https://github.com/ps3coder/Project_images_url/blob/main/Screenshot%202024-12-26%20193641.png)
• Product FORM Page Screenshot ![Product FORM Page Screenshot](https://github.com/ps3coder/Project_images_url/blob/main/Screenshot%202024-12-26%20193720.png)
• POSTGRESS Screenshot ![POSTGRESS Screenshot](https://github.com/ps3coder/Project_images_url/blob/main/Screenshot%202024-12-26%20193817.png)
• Summary Screenshot ![Summary Screenshot](https://github.com/ps3coder/Project_images_url/blob/main/Screenshot%202024-12-26%20195851.png)

### **Project Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/ps3coder/assets_management_ERP
   cd my-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Configure the `.env` file with your PostgreSQL credentials:
     ```
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
     ```
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     npx prisma generate
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

---

#### **Products**

**Database Schema:**

- `id`: UUID, Primary Key
- `name`, `description`: String
- `price`: Decimal
- `quantity`: Integer
- `createdAt`, `updatedAt`: Timestamp

**API Endpoints:**

- `GET /api/products`
- `POST /api/products`
- `GET /api/products/[id]`
- `PUT /api/products/[id]`
- `DELETE /api/products/[id]`

**Components:**

- `ProductAddForm.js`
- `ProductList.js`
- `SalesOrderForm.js`
- `SalesSummary.js`
- `SalesUpdateForm.js`

---

#### **Sales Orders**

**Database Schema:**

- `id`, `orderDate`, `customerName`: Core fields
- `totalAmount`, `status`: Status and total tracking
- `items`: Linked to `SalesOrderItem` table

**API Endpoints:**

- `GET /api/sales-orders`
- `POST /api/sales-orders`
- `GET /api/sales-orders/[id]`
- `PUT /api/sales-orders/[id]`
- `DELETE /api/sales-orders/[id]`

**Components:**

- Sales Order List Page
- Sales Order Form (`SalesOrderForm.js`)
- Sales Order Detail Page

---

#### **Reports**

**API Endpoint:**

- `GET /api/reports/sales-summary`

---

### **Development Notes**

1. **Prisma Client:**  
   `lib/prisma.js` exports a single Prisma client instance to interact with the database.

2. **Services:**  
   Encapsulate database operations in `services/` for better modularity:

   - `productService.js`: Product operations.
   - `salesOrderService.js`: Sales order operations.
   - `reportService.js`: Aggregated report queries.

3. **Error Handling:**  
   Comprehensive error handling for both client and server.

### **Commands**

- Run migrations:
  ```bash
  npx prisma migrate dev
  ```
- Generate Prisma Client:
  ```bash
  npx prisma generate
  ```
- Start development server:
  ```bash
  npm run dev
  ```

---

## Contact

If you have any questions, feel free to reach out:

- **Email:** ps3threee@gmail.com
- **LinkedIn:** [Pankaj Sharma](https://www.linkedin.com/in/pankaj-sharma-925b2b250/)
