import Link from "next/link";
import "../styles/page.css";
export default function HomePage() {
  return (
    <div className="home-page">
      <header id="header">
        <h1 className="title">ERP System for Product Management</h1>
        <p className="description">
          Manage your products, sales orders, and reports all in one place.
        </p>
      </header>
      <nav id="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link href="/sales-orders">Sales Orders</Link>
          </li>
          <li className="nav-item">
            <Link href="/reports/sales-summary">Reports</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
