export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Assets Manager</title>
      </head>
      <body>
        <header
          style={{ padding: "20px", backgroundColor: "#f4f4f4" }}
        ></header>
        <main>{children}</main>
      </body>
    </html>
  );
}
