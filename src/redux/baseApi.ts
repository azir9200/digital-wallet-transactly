
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api/v1",
//     credentials: "include",

//     prepareHeaders: (headers, { getState }) => {
//       const state = getState() as RootState;
//       console.log("base api", state);
//       const token = state.auth?.token ?? "";
//       console.log("base token", token)
//       if (token) {
//         headers.set("Authorization", `${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["USER"],
//   endpoints: () => ({}),
// });

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: config.baseUrl,
  //     credentials: "include",
  //   }),
  tagTypes: ["USER", "TOUR", "DIVISION", "BOOKING"],
  endpoints: () => ({}),
});
