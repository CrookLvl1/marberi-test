<template>
  <FixedLeftColumn sticky>
    <template #fixed>
      <div class="fixed-left-wrapper">
        <Button :color="'gray'">
          <span>Назад</span>
        </Button>
        <div class="block orders-block orders-block-1">
          <InputDate v-model="dateRange" label="Период" range :required="false" />
          <Search
            v-model:search-query="searchQuery"
            v-model:search-type="selectedSearchType"
            :search-types="searchTypes"
            select-display-value="icon"
            @submit="handleSearch"
          />

          <ToggleGroup class="orders-block-1__sort-buttons">
            <ToggleGroupItem :color="'gray'" :value="'all'">Все</ToggleGroupItem>
            <ToggleGroupItem :color="'gray'" v-for="i in 10" :value="`${i}`" :key="i"> {{ i }}</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div class="block orders-block orders-block-2">
          <Select v-model="selectedYear" placeholder="Год" :items="yearSelectOptions" />
          <div class="orders-block-2__buttons">
            <Button :color="'purple'" @click.prevent="applySelectedYear">Показать</Button>
            <Button :color="'gray'" @click.prevent="applySelectedYear($event, true)">Сбросить</Button>
          </div>
          <Notice>
            <span
              >Обычный вывод показывает 250 заказов, чтобы снять ограничение и показать до 5000 заказов нужно выбрать
              год</span
            >
          </Notice>
        </div>
      </div>
    </template>
    <template #default>
      <OrdersList />
    </template>
  </FixedLeftColumn>
</template>

<script lang="ts" setup>
import { FixedLeftColumn } from "~/shared/ui/templates/";
import { InputDate } from "~/shared/ui/inputs/input-date/";
import { Search } from "~/shared/ui/search/";
import { ToggleGroup, ToggleGroupItem } from "~/shared/ui/toggle-group";
import { Select } from "~/shared/ui/select";
import { Button } from "~/shared/ui/button";
import { Notice } from "~/shared/ui/notice";

import OrdersList from "./OrdersList.vue";
import type { QueryKeys, Query, SearchTypeKeys } from "./types";
import { searchTypes, yearSelectOptions } from "./consts";
import { queryKeyCheck, transformDate, revertTransformDate } from "./utils";

//  Query

const queryParams: Query = reactive({});

onMounted(() => {
  const initialQuery = useRoute().query as Query;
  const dateTuple: [Date | null, Date | null] = [null, null];
  for (const key in initialQuery) {
    if (!queryKeyCheck(key)) continue;
    queryParams[key] = initialQuery[key];

    switch (key) {
      case "date_start": {
        dateTuple[0] = revertTransformDate(`${initialQuery[key]}`);
        break;
      }
      case "date_finish": {
        dateTuple[1] = revertTransformDate(`${initialQuery[key]}`);
        break;
      }
      case "year": {
        selectedYear.value = `${initialQuery[key]}`;
        break;
      }
    }
  }
  //  @ts-expect-error
  if (dateTuple[0] && dateTuple[1]) dateRange.value = dateTuple;
});

const applyQueryParam = <Key extends QueryKeys>(queryKey: Key, queryValue: Query[Key]) => {
  queryParams[queryKey] = queryValue;
};

const router = useRouter();
watch(queryParams, currentQueryParams => {
  router.push({ query: currentQueryParams });
});

//  Search-handling

const searchQuery = ref("");
const selectedSearchType = ref<SearchTypeKeys>("default");

const handleSearch = () => {
  if (selectedSearchType.value === "default" || !searchQuery.value) {
    applyQueryParam("search_type", undefined);
    applyQueryParam("search_value", undefined);
  } else {
    applyQueryParam("search_type", selectedSearchType.value);
    applyQueryParam("search_value", searchQuery.value);
  }

  searchQuery.value = "";
};

//  Date-range

const dateRange = shallowRef<[Date, Date]>();
watch(dateRange, tuple => {
  if (!tuple) return;

  applyQueryParam("date_start", transformDate(tuple[0]));
  applyQueryParam("date_finish", transformDate(tuple[1]));
});

//  Year
const selectedYear = ref();
const applySelectedYear = (_ev: MouseEvent, reset = false) => {
  if (reset) applyQueryParam("year", (selectedYear.value = undefined));
  else applyQueryParam("year", selectedYear.value);
};
</script>

<style lang="scss" scoped>
@import "~/shared/assets/styles/pages/manager/orders/fixed-left.scss";
</style>
