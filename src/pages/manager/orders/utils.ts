import type { StatusColorValues } from "~/shared/config/status-to-color";

import { queryKeys } from "./consts";
import type { InternalAPIFetchOrdersResponse, QueryKeys } from "./types";
//      unexported

//  for transformDate
const toDefault = (value: number): string => `${value < 10 ? "0" : ""}${value}`;

//  for revertTransformDate
const reg = /\b\d+\b/;

//      exported

//  type-check

const queryKeyCheck = (key: string): key is QueryKeys => queryKeys.findIndex(queryKey => queryKey === key) !== -1;

const isValiableResponse = (response: any): response is InternalAPIFetchOrdersResponse =>
  response.response !== undefined;

//  basic-utils

const transformDate = (dateObj: Date) =>
  `${dateObj.getFullYear()}${toDefault(dateObj.getMonth())}${toDefault(dateObj.getDate())}`;

const revertTransformDate = (dateString: string): Date | null => {
  if (dateString.length !== 8 || !reg.test(dateString)) return null;

  return new Date(+dateString.slice(0, 4), +dateString.slice(4, 6), +dateString.slice(6, 8));
};

const getCardColor = (status: string): StatusColorValues => {
  switch (status) {
    case "0":
      return "danger";
    case "1":
      return "blue";
    case "2":
      return "success";

    default:
      return "idle";
  }
};

export { queryKeyCheck, transformDate, getCardColor, isValiableResponse, revertTransformDate };
