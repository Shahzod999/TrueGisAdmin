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
  tagTypes: [
    "User",
    "DeliverAdmin",
    "AssignCompany",
    "Company",
    "Comments",
    "Type",
    "UPDATECOMPANY",
    "Category",
    "Products",
    "Orders",
    "Reports",
  ],
  endpoints: () => ({}),
});
