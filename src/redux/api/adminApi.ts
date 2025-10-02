import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
    }),
    approvedAgent: builder.mutation({
      query: ({ id, userInfo }) => ({
        url: `/user/agents/${id}`,
        method: "PATCH",
        body: userInfo,
      }),
    }),
    getStats: builder.query({
      query: () => ({
        url: "/user/stats",
        method: "GET",
      }),
    }),
    getChat: builder.query({
      query: () => ({
        url: "/user/chart-data",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useApprovedAgentMutation,
  useGetChatQuery,
  useGetStatsQuery,
} = adminApi;
