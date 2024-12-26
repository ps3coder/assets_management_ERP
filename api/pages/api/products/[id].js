import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const id = req.query.id;

    if (req.method === "GET") {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
