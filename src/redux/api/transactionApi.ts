import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: (userInfo) => ({
        url: "/transactions/transfer",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Transaction"], // ✅ Refetch all transaction queries
    }),

    addMoney: builder.mutation({
      query: (userInfo) => ({
        url: "/transactions/addMoney",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Transaction"], // ✅
    }),

    withdraw: builder.mutation({
      query: (userInfo) => ({
        url: "/transactions/withdraw",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Transaction"], // ✅
    }),

    cashIn: builder.mutation({
      query: (cashInData) => ({
        url: "/transactions/cashIn",
        method: "POST",
        body: cashInData,
      }),
      invalidatesTags: ["Transaction"], // ✅
    }),

    cashOut: builder.mutation({
      query: (cashOutData) => ({
        url: "/transactions/cashOut",
        method: "POST",
        body: cashOutData,
      }),
      invalidatesTags: ["Transaction"], // ✅
    }),

    getAllTransaction: builder.query({
      query: () => ({
        url: "/transactions/all",
        method: "GET",
      }),
      providesTags: ["Transaction"], // ✅ Provides tag for auto-refresh
    }),

    getMyTransaction: builder.query({
      query: () => ({
        url: "/transactions/getMe",
        method: "GET",
      }),
      providesTags: ["Transaction"], // ✅ Provides tag for auto-refresh
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useAddMoneyMutation,
  useWithdrawMutation,
  useCashInMutation,
  useCashOutMutation,
  useGetAllTransactionQuery,
  useGetMyTransactionQuery,
} = transactionApi;
