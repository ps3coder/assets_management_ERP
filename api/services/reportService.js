import prisma from "../lib/prisma";

export const getSalesSummary = async () => {
  return await prisma.salesOrder.aggregate({
    _sum: {
      totalAmount: true,
    },
    _count: {
      id: true,
    },
    groupBy: {
      status: true,
    },
  });
};
