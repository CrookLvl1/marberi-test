import { internalAPIFetch } from "~/shared/api/internal/instance";

import type { OrderResponseObject } from "./types";
import { isValiableResponse } from "./utils";

export default defineStore("orders-store", () => {
  const orders = reactive<Array<OrderResponseObject>>([]);

  internalAPIFetch("/orders.getTest", { method: "get" })
    .then(responseObj => {
      if (!isValiableResponse(responseObj)) throw new Error("invalid response");
      return responseObj.response.data;
    })
    .then(data => data.orders.forEach(element => orders.push(element)))
    .catch(console.warn);

  const getOrders = computed(() => orders);
  return {
    getOrders
  };
});
