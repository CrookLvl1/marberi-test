import { queryKeys, searchTypes } from "./consts";

//  Query type

type QueryKeys = (typeof queryKeys)[number];

type Query = {
  [Key in QueryKeys]?: string;
};

//  Search types

type SearchTypeKeys = keyof typeof searchTypes;

//  API request type

type OrderResponseObject = Record<string, any> & {
  id: string;
  status: string;
};

type InternalAPIFetchOrdersResponse = {
  response: {
    data: {
      orders: Array<OrderResponseObject>;
    };
  };
};

type RouterOrderParams = {
  id_orders?: number;
};

//  export types

export type {
  OrderResponseObject,
  InternalAPIFetchOrdersResponse,
  QueryKeys,
  SearchTypeKeys,
  Query,
  RouterOrderParams
};
