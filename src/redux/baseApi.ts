// src/redux/config/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://digital-wallet-backend-drab.vercel.app/api/v1",
    // baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.token ?? "";
      if (token) {
        // Ensure token is properly formatted without any extra spaces or characters
        const cleanToken = token.trim();
        headers.set("Authorization", `${cleanToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["USER", "Transaction"],
  endpoints: () => ({}),
});
