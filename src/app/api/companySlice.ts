import { InputUserInfo, userType } from "../types/userType";
import { apiSlice } from "./apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<userType, InputUserInfo>({
      query: ({ data }) => ({
        url: "/root/root/login",
        method: "POST",
        body: data,
      }),
    }),
    addnewUser: builder.mutation({
      query: ({ data }) => ({
        url: "/root/root",
        method: "POST",
        body: data,
      }),
    }),
    getAllUser: builder.query({
      query: ({}) => ({
        url: "/root/root",
      }),
    }),
    getOneUser: builder.query({
      query: ({ id }) => ({
        url: `/root/root/${id}`,
      }),
    }),
    updateOneUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/root/root/${id}`,
        method:"PUT",
        body,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useAddnewUserMutation,
  useGetAllUserQuery,
  useGetOneUserQuery,
  useUpdateOneUserMutation,
} = companyApiSlice;
