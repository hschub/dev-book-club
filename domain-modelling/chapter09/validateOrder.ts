import type {
  ValidateOrder,
  CheckProductCodeExists,
  CheckAddressExists,
  UnvalidatedOrder,
  ValidatedOrder,
} from "./types";

export const validateOrder: ValidateOrder = (
  checkProductCodeExists: CheckProductCodeExists,
  checkAddressExists: CheckAddressExists,
  order: UnvalidatedOrder
): ValidatedOrder => {
  return {
    kind: "ValidatedOrder",
    productCode: order.productCode,
    address: order.address,
  };
};
