export type ProductCode = {
  kind: "ProductCode";
  value: string;
};

export type Address = {
  kind: "Address";
  value: string;
};

export type UnvalidatedOrder = {
  kind: "UnvalidatedOrder";
  productCode: ProductCode;
  address: Address;
};

export type ValidatedOrder = {
  kind: "ValidatedOrder";
  productCode: ProductCode;
  address: Address;
};

export type PricedOrder = {
  kind: "PricedOrder";
  productCode: ProductCode;
  address: Address;
  price: number;
};

export type CheckAddressExists = (address: Address) => boolean;

export type CheckProductCodeExists = (productCode: ProductCode) => boolean;

export type GetProductPrice = (productCode: ProductCode) => number;

export type ValidateOrder = (
  checkProductCodeExists: CheckProductCodeExists,
  checkAddressExists: CheckAddressExists,
  order: UnvalidatedOrder
) => ValidatedOrder;

export type ValidateOrder$ = (order: UnvalidatedOrder) => ValidatedOrder;

export type PriceOrder = (
  getProductPrice: GetProductPrice,
  order: ValidatedOrder
) => PricedOrder;

export type PriceOrder$ = (order: ValidatedOrder) => PricedOrder;

export type PlaceOrderResult = { pricedOrder: PricedOrder };

export type PlaceOrder = (
  validateOrder: ValidateOrder$,
  priceOrder: PriceOrder$,
  order: UnvalidatedOrder
) => PlaceOrderResult;

export type PlaceOrder$ = (order: UnvalidatedOrder) => PlaceOrderResult;
