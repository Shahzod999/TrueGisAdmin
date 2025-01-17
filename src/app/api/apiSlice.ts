import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dev.admin13.uz/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "DeliverAdmin", "Company", "Comments", "Type"],
  endpoints: () => ({}),
});
