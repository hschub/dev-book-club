// GOAL: Implement the following function
//
// let placeOrder : PlaceOrderWorkflow =
//   fun unvalidatedOrder ->
//     unvalidatedOrder
//     |> validateOrder
//     |> priceOrder
//     |> acknowledgeOrder          // We'll skip this step for now
//     |> createEvents              // We'll skip this step for now
