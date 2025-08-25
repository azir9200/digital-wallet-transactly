/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      console.log("tok ", token);
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["USER"],
  endpoints: () => ({}),
});
