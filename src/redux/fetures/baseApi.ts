import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosbaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER"],
  endpoints: () => ({}),
});
