import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/user/me",
        method: "GET",
      }),
      // providesTags: ["USER"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useUserInfoQuery } =
  authApi;
