import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const salesSummary = await prisma.salesOrder.groupBy({
      by: ["status"],
      _sum: {
        totalAmount: true,
      },
      _count: {
        id: true,
      },
    });

    return res.json(salesSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
