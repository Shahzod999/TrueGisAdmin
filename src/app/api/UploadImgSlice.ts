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
    deleteImg: builder.mutation({
      query: ({ data }) => ({
        url: "/image/delete",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});
export const { useUploadImgMutation, useDeleteImgMutation } = UploadImgSlice;
