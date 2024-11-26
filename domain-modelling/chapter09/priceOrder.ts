import { PriceOrder } from "./types";

export const priceOrder: PriceOrder = (getProductPrice, order) => {
  const price = getProductPrice(order.productCode);
  return {
    kind: "PricedOrder",
    productCode: order.productCode,
    address: order.address,
    price,
  };
};
