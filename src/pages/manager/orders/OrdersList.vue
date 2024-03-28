<template>
  <ul v-if="orders.length > 0" class="status-cards-list">
    <li v-for="orderObject in orders" :key="orderObject.id">
      <StatusCard tag="li" class="status-cards-list__card card" :status="getCardColor(orderObject.status)">
        №: {{ orderObject.id }}
      </StatusCard>
    </li>
  </ul>
  <Empty v-else> Заказов ещё нет </Empty>
</template>

<script setup lang="ts">
import { StatusCard } from "~/shared/ui/status-card";
import { Empty } from "~/shared/ui/empty";

import { getCardColor } from "./utils";
import useOrdersStore from "./store";

const store = useOrdersStore();

const orders = computed(() => store.getOrders);
</script>

<style scoped lang="scss">
@import "~/shared/assets/styles/pages/manager/orders/fixed-content.scss";
@import "~/shared/assets/styles/pages/manager/orders/card.scss";
</style>
