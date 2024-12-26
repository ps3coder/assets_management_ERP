import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const products = await prisma.product.findMany();
      res.json(products);
    } else if (req.method === "POST") {
      console.log("Received body:", req.body);
      const { name, description, price, quantity } = req.body;
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      });
      res.json(product);
    } else if (req.method === "PUT") {
      const { id, name, description, price, quantity } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      });

      res.json(updatedProduct);
    } else if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      await prisma.product.delete({
        where: { id },
      });
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}
