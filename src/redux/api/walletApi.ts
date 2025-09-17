import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWallet: builder.query({
      query: () => ({
        url: "/getMe",
        method: "GET",
      }),
    }),
    getWalletStat: builder.query({
      query: () => ({
        url: "/statS/wallet",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyWalletQuery, useGetWalletStatQuery } = walletApi;
