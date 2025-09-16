import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWalletStat: builder.query({
      query: () => ({
        url: "/statS/wallet",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetWalletStatQuery } = walletApi;
