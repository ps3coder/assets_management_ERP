import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const id = req.query.id;

    if (req.methods === "GET") {
      const salesOrder = await prisma.salesOrder.findUnique({
        where: { id },
        include: { items: true },
      });
      if (!salesOrder) {
        return res.status(404).json({ message: "Sales order not found" });
      }
      res.json(salesOrder);
    } else {
      res.status(405).json({ message: "Methods not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
