<template>
  <StatusCard v-if="orderCard" class="card" :status="getCardColor(orderCard.status)">№: {{ orderCard.id }}</StatusCard>
  <Empty v-else>Такого заказа не существует</Empty>
</template>

<script setup lang="ts">
import { StatusCard } from "~/shared/ui/status-card";
import { Empty } from "~/shared/ui/empty";

import { getCardColor } from "./utils";
import useOrdersStore from "./store";

const orderCard = computed(() => useOrdersStore().getOrders.find(order => order.id === useRoute().params.id_orders));
</script>
<style lang="scss" scoped>
@import "~/shared/assets/styles/pages/manager/orders/card.scss";
</style>
