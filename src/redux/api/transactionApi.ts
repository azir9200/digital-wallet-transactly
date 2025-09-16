import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    transfer: builder.mutation({
      query: (transferData) => ({
        url: "/transfer",
        method: "POST",
        data: transferData,
      }),
      //   invalidatesTags: [],
    }),
    addMoney: builder.mutation({
      query: (addMoneyData) => ({
        url: "/addMoney",
        method: "POST",
        data: addMoneyData,
      }),
      //   invalidatesTags: [],
    }),
    withdraw: builder.mutation({
      query: (withdrawData) => ({
        url: "/withdraw",
        method: "POST",
        data: withdrawData,
      }),
      //   invalidatesTags: [],
    }),
    cashIn: builder.mutation({
      query: (cashInData) => ({
        url: "/cashIn",
        method: "POST",
        data: cashInData,
      }),
      //   invalidatesTags: [],
    }),
    cashOut: builder.mutation({
      query: (cashOutData) => ({
        url: "/cashOut",
        method: "POST",
        data: cashOutData,
      }),
    }),

    getAllTransaction: builder.query({
      query: () => ({
        url: "/transactions",
        method: "GET",
      }),
    }),

    getMyTransaction: builder.query({
      query: () => ({
        url: "/getMe",
        method: "GET",
      }),
    }),
    updateTransaction: builder.query({
      query: () => ({
        url: "/transaction/:id",
        method: "GET",
      }),
    }),
    getTransactionStat: builder.query({
      query: () => ({
        url: "/stats/transaction",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useTransferMutation,
  useAddMoneyMutation,
  useWithdrawMutation,
  useCashInMutation,
  useCashOutMutation,
  useGetAllTransactionQuery,
  useGetMyTransactionQuery,
  useUpdateTransactionQuery,
  useGetTransactionStatQuery,
} = transactionApi;
