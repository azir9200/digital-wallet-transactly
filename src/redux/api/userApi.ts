import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
    }),

    getAllAgent: builder.query({
      query: () => ({
        url: "/user/all-agents",
        method: "GET",
      }),
    }),
    geMEWallet: builder.query({
      query: () => ({
        url: "/wallet/getMe",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useGetAllAgentQuery, useGeMEWalletQuery } =
  userApi;
