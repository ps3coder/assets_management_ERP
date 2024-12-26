import prisma from "@/lib/prisma";

export const getAllSalesOrders = async () => {
  return await prisma.salesOrder.findMany({ include: { items: true } });
};

export const getSalesOrderById = async (id) => {
  return await prisma.salesOrder.findUnique({
    where: { id },
    include: { items: true },
  });
};

export const createSalesOrder = async (data) => {
  return await prisma.salesOrder.create({ data });
};

export const updateSalesOrder = async (id, data) => {
  return await prisma.salesOrder.update({ where: { id }, data });
};

export const deleteSalesOrder = async (id) => {
  return await prisma.salesOrder.delete({ where: { id } });
};
