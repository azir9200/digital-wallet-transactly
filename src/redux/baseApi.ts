import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      // console.log(state);
      const token = state.auth?.token ?? "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["USER"],
  endpoints: () => ({}),
});
