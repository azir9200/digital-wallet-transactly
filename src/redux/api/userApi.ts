import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;
