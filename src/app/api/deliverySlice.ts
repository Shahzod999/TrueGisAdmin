import { CompanyType } from "../types/companyType";
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
      query: ({ id, data }) => ({
        url: `/delivery/root/admin/${id}`,
        method: "PUT",
        body: data,
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
    getAllCompany: builder.query<CompanyType, any>({
      query: ({ page }) => ({
        url: "/delivery/root/company",
        params: {
          page,
        },
      }),
      providesTags: ["Company"],
    }),
    getSingleCompany: builder.query({
      query: ({ id }) => ({
        url: `/delivery/root/company/${id}`,
      }),
      providesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/company/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: builder.mutation({
      query: ({ id }) => ({
        url: `/delivery/root/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
    addNewCompany: builder.mutation({
      query: ({ data }) => ({
        url: "/delivery/root/company",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetAdminDataQuery,
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
  useDeleteSingleAdminMutation,
  useAddNewAdminDeliveryMutation,
  useGetAllCompanyQuery,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useAddNewCompanyMutation,
} = deliverySlice;
