import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgent: builder.query({
      query: () => ({
        url: "/user/all-agents",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAgentQuery } = adminApi;
