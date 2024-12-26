import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const salesOrders = await prisma.salesOrder.findMany({
        include: { items: true },
      });
      res.json(salesOrders);
    } else if (req.method === "POST") {
      const { customerName, totalAmount, items, status } = req.body;
      const salesOrder = await prisma.salesOrder.create({
        data: {
          customerName,
          totalAmount,
          status,
          items: { create: items },
        },
      });
      res.json(salesOrder);
    } else if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Order ID is required" });
      }

      await prisma.salesOrderItem.deleteMany({ where: { salesOrderId: id } });
      await prisma.salesOrder.delete({ where: { id } });

      res.json({ message: "Sales order deleted successfully" });
    } else if (req.method === "PUT") {
      const { id, customerName, totalAmount, status } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Order ID is required" });
      }

      const updatedOrder = await prisma.salesOrder.update({
        where: { id },
        data: { customerName, totalAmount, status },
      });

      res.json(updatedOrder);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message });
  }
}
