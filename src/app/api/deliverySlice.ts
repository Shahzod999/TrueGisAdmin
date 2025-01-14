import { getAdminType } from "../types/deliveryType";
import { apiSlice } from "./apiSlice";

export const deliverySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminData: builder.query<getAdminType, void>({
      query: () => "/delivery/root/admin",
      providesTags: ["DeliverAdmin"],
    }),
    getSingleAdmin: builder.query({
      query: ({ id }) => `/delivery/root/admin/${id}`,
    }),
    updateSingleAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/delivery/root/admin/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["DeliverAdmin"],
    }),
    deleteSingleAdmin: builder.mutation({
      query: (id) => ({
        url: `/delivery/root/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeliverAdmin"],
    }),
    addNewAdminDelivery: builder.mutation({
      query: (data) => ({
        url: "/delivery/root/admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliverAdmin"],
    }),
  }),
});

export const {
  useGetAdminDataQuery,
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
  useDeleteSingleAdminMutation,
  useAddNewAdminDeliveryMutation,
} = deliverySlice;
