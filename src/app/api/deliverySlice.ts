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
    // company
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
    }),
    deleteUpdateCompany: builder.mutation({
      query: (id) => ({
        url: `/delivery/root/company/update-request/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
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
} = deliverySlice;
