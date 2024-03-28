import type { SelectItems } from "~/shared/ui/select";

const queryKeys = ["search_type", "search_value", "year", "date_start", "date_finish"] as const;

const searchTypes = {
  default: {
    title: "Не выбрано",
    placeholder: "Выберите фильтр"
  },
  order_number: {
    title: "Номер заказа",
    placeholder: "Введите номер заказа"
  },
  psid: {
    title: "Номер фотосессии",
    placeholder: "Введите Номер фотосессии"
  },
  client_id: {
    title: "Клиент ID",
    placeholder: "Введите ID клиента"
  },
  phone: {
    title: "Телефон",
    placeholder: "Введите номер телефона"
  },
  email: {
    title: "Email",
    placeholder: "Введите email"
  },
  payer: {
    title: "Плательщик",
    placeholder: "Введите ФИО плательщика"
  }
} as const;

const yearSelectOptions: SelectItems = [
  { value: "2023", title: "2023" },
  { value: "2022", title: "2022" },
  { value: "2021", title: "2021" },
  { value: "2020", title: "2020" }
] as const;

export { queryKeys, searchTypes, yearSelectOptions };
