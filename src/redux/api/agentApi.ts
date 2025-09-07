import { baseApi } from "@/redux/baseApi";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgent: builder.query({
      query: () => ({
        url: "/user/all-agents",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAgentQuery } = agentApi;
