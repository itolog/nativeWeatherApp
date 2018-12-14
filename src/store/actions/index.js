import { DATA_API, LOAD_HOURLY, LOAD_DAILY } from "./actionTypes";

export const dataLoadFetch = payLoad => ({
  type: DATA_API,
  payLoad
});

export const dataLoadHourly = payLoad => ({
  type: LOAD_HOURLY,
  payLoad
});

export const dataLoadDaily = payLoad => ({
  type: LOAD_DAILY,
  payLoad
});
