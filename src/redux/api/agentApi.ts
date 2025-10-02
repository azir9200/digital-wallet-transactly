import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgent: builder.query({
      query: () => ({
        url: "/user/all-agents",
        method: "GET",
      }),
    }),

    getAllWallet: builder.query({
      query: () => ({
        url: "/wallet",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useGetAgentQuery, useGetAllWalletQuery } = agentApi;
