import { DATA_API, LOAD_HOURLY, LOAD_DAYLY } from "./actionTypes";

export const dataLoadFetch = payLoad => ({
  type: DATA_API,
  payLoad
});

export const dataLoadHourly = payLoad => ({
  type: LOAD_HOURLY,
  payLoad
});

export const dataLoadDayly = payLoad => ({
  type: LOAD_DAYLY,
  payLoad
});
