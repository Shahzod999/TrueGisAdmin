import { CompanyType } from "../types/companyType";
import { getAdminType } from "../types/deliveryType";
import {
  ProductsTypesAll,
  SingleProductTypesAll,
} from "../types/productsTypes";
import { apiSlice } from "./apiSlice";

export const deliverySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminData: builder.query<getAdminType, void>({
      query: () => "/delivery/root/admin",
      providesTags: ["DeliverAdmin"],
    }),
    getSingleAdmin: builder.query({
      query: ({ id }) => `/delivery/root/admin/${id}`,
      providesTags: ["DeliverAdmin"],
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
      query: ({ id }) => ({
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
    adminAssignCompany: builder.mutation({
      query: ({ data }) => ({
        url: "/delivery/root/admin/assign-company",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliverAdmin", "AssignCompany"],
    }),
    adminAssignedCompany: builder.query({
      query: ({ admin_id }) =>
        `/delivery/root/admin/assigned-companies/${admin_id}`,
      providesTags: ["DeliverAdmin", "AssignCompany"],
    }),
    adminUnAssignCompany: builder.mutation({
      query: ({ data }) => ({
        url: "/delivery/root/admin/unassign-company",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["DeliverAdmin", "AssignCompany"],
    }),
    // company
    getAllCompany: builder.query<CompanyType, any>({
      query: ({ page, keyword, admin_id }) => ({
        url: "/delivery/root/company",
        params: {
          page,
          keyword,
          admin_id,
        },
      }),
      providesTags: ["Company", "AssignCompany"],
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
    // comments
    getAllComments: builder.query({
      query: ({ page }) => ({
        url: "/delivery/root/comment",
        params: {
          page,
        },
      }),
      providesTags: ["Comments"],
    }),
    getOneComment: builder.query({
      query: ({ id }) => ({
        url: `/delivery/root/comment/${id}`,
      }),
      providesTags: ["Comments"],
    }),
    replyToOneComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/comment/reply/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    updateOneReply: builder.mutation({
      query: ({ reply_id, comment_id, data }) => ({
        url: `/delivery/root/comment/reply/${comment_id}/${reply_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteOneReply: builder.mutation({
      query: ({ reply_id, comment_id }) => ({
        url: `/delivery/root/comment/reply/${comment_id}/${reply_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
    updateOneComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/comment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteOneComment: builder.mutation({
      query: ({ id }) => ({
        url: `/delivery/root/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
    // Get all types
    getAllTypes: builder.query({
      query: () => "/delivery/root/type",
      providesTags: ["Type"],
    }),
    addNewType: builder.mutation({
      query: (data) => ({
        url: "/delivery/root/type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Type"],
    }),
    updateType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/type/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Type"],
    }),
    deleteType: builder.mutation({
      query: (id) => ({
        url: `/delivery/root/type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Type"],
    }),
    // user
    getAllDeliveryUsers: builder.query({
      query: ({ page = 1, limit = 15, search = "" }) => ({
        url: "/delivery/root/user",
        params: { page, limit, search },
      }),
      providesTags: ["User"],
    }),
    getDeliveryUser: builder.query({
      query: (id) => `/delivery/root/user/${id}`,
      providesTags: ["User"],
    }),
    updateDeliveryUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteDeliveryUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delivery/root/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // updateCompany
    getUpdateCompany: builder.query({
      query: ({ page }) => ({
        url: "/delivery/root/company/update-request",
        params: {
          page,
        },
      }),

      providesTags: ["UPDATECOMPANY"],
    }),
    getSingleUpdateCompany: builder.query({
      query: (id) => `/delivery/root/company/update-request/${id}`,
      providesTags: ["UPDATECOMPANY"],
    }),
    putUpdateCompany: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/company/update-request/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UPDATECOMPANY"],
    }),
    deleteUpdateCompany: builder.mutation({
      query: (id) => ({
        url: `/delivery/root/company/update-request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UPDATECOMPANY"],
    }),
    // category
    getAllCategory: builder.query({
      query: ({ page, company_id }) => ({
        url: "/delivery/root/category",
        params: { page, company_id },
      }),
      providesTags: ["Category"],
    }),
    addNewCategory: builder.mutation({
      query: (data) => ({
        url: "/delivery/root/category/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    getSingleCategory: builder.query({
      query: (id) => `/delivery/root/category/${id}`,
      providesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/delivery/root/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    // products
    getAllProducts: builder.query<
      ProductsTypesAll,
      { page: string; limit: string; company_id: string; category_id: string }
    >({
      query: ({ page, limit = 15, company_id, category_id }) => ({
        url: "/delivery/root/product",
        params: {
          page,
          limit,
          company_id,
          category_id,
        },
      }),
      providesTags: ["Products"],
    }),
    getSingleProducts: builder.query<
      SingleProductTypesAll,
      { id: string | undefined }
    >({
      query: ({ id }) => `/delivery/root/product/${id}`,
      providesTags: ["Products"],
    }),
    updateProducts: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProducts: builder.mutation({
      query: ({ id }) => ({
        url: `/delivery/root/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    addNewProducts: builder.mutation({
      query: ({ category_id, data }) => ({
        url: `/delivery/root/product/${category_id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    addCompanyLink: builder.mutation({
      query: ({ data }) => ({
        url: "/delivery/root/product/add-company-link",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    removeCompanyLinks: builder.mutation({
      query: ({ data }) => ({
        url: "/delivery/root/product/remove-company-link",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // orders
    getAllOrders: builder.query({
      query: ({ page, limit = 16, company_id }) => ({
        url: "/delivery/root/order",
        params: {
          company_id,
          page,
          limit,
        },
      }),
      providesTags: ["Orders"],
    }),
    getSingleOrder: builder.query({
      query: ({ id }) => `/delivery/root/order/${id}`,
      providesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: ({ id }) => ({
        url: `/delivery/root/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    // reports
    getAllReports: builder.query({
      query: ({ page, limit = 15 }) => ({
        url: "/delivery/root/report/",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Reports"],
    }),
    getSingleReport: builder.query({
      query: ({ id }) => `/delivery/root/report/${id}`,
      providesTags: ["Reports"],
    }),
    updateReport: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/root/report/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const {
  useAdminAssignedCompanyQuery,
  useAdminAssignCompanyMutation,
  useAdminUnAssignCompanyMutation,
  useGetAdminDataQuery,
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
  useDeleteSingleAdminMutation,
  useAddNewAdminDeliveryMutation,
  // company
  useGetAllCompanyQuery,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useAddNewCompanyMutation,
  // comments
  useGetAllCommentsQuery,
  useGetOneCommentQuery,
  useReplyToOneCommentMutation,
  useUpdateOneCommentMutation,
  useDeleteOneCommentMutation,
  useUpdateOneReplyMutation,
  useDeleteOneReplyMutation,
  // types
  useGetAllTypesQuery,
  useAddNewTypeMutation,
  useUpdateTypeMutation,
  useDeleteTypeMutation,
  // user
  useGetAllDeliveryUsersQuery,
  useGetDeliveryUserQuery,
  useUpdateDeliveryUserMutation,
  useDeleteDeliveryUserMutation,
  // updateCompany
  useGetUpdateCompanyQuery,
  useGetSingleUpdateCompanyQuery,
  usePutUpdateCompanyMutation,
  useDeleteUpdateCompanyMutation,
  // category
  useGetAllCategoryQuery,
  useAddNewCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetSingleCategoryQuery,
  // products
  useGetAllProductsQuery,
  useGetSingleProductsQuery,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  useAddNewProductsMutation,
  useAddCompanyLinkMutation,
  useRemoveCompanyLinksMutation,
  // orders
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
  // reports
  useGetAllReportsQuery,
  useGetSingleReportQuery,
  useUpdateReportMutation,
} = deliverySlice;
