// GOAL: Implement the following function
//
// let placeOrder : PlaceOrderWorkflow =
//   fun unvalidatedOrder ->
//     unvalidatedOrder
//     |> validateOrder
//     |> priceOrder
//     |> acknowledgeOrder          // We'll skip this step for now
//     |> createEvents              // We'll skip this step for now

import { ValidateOrder$, PriceOrder$, PlaceOrder$ } from "./types";

import { checkAddressExists } from "./checkAddressExists";
import { checkProductCodeExists } from "./checkProdutCodeExists";
import { getProductPrice } from "./getProductPrice";
import { validateOrder } from "./validateOrder";
import { priceOrder } from "./priceOrder";

const validateOrder$: ValidateOrder$ = (order) =>
  validateOrder(checkProductCodeExists, checkAddressExists, order);

const priceOrder$: PriceOrder$ = (order) => priceOrder(getProductPrice, order);

const placeOrder$: PlaceOrder$ = (order) => {
  const validatedOrder = validateOrder$(order);
  const pricedOrder = priceOrder$(validatedOrder);
  return { pricedOrder };
};
