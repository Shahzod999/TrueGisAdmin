import { apiSlice } from "./apiSlice";

export const UploadImgSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImg: builder.mutation({
      query: ({ formData }) => ({
        url: "/image/upload",
        method: "POST",
        body: formData,
      }),
    }),
    deleteIMg: builder.mutation({
      query: (deleteData) => ({
        url: "/image/upload",
        method: "DELETE",
        body: deleteData,
      }),
    }),
  }),
});
export const { useUploadImgMutation, useDeleteIMgMutation } = UploadImgSlice;
