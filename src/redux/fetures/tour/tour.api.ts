import type { TourListResponse } from "@/pages/tour/tour.type";
import { baseApi } from "../baseApi";

export interface IResponse<T> {
  massage: string;
  statusCode: number;
  success: boolean;
  data: T;
}

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTour: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create-tour",
        method: "POST",
        data: tourInfo,
      }),
    }),

    allTour: builder.query<TourListResponse, unknown>({
      query: (params) => ({
        url: "/tour/allTour",
        method: "GET",
        params: params,
        providesTags: ["TOUR"],
      }),
    }),
    removeTourType: builder.mutation({
      query: (tourId) => ({
        url: `/tourType/delete/${tourId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTourMutation,
  useAllTourQuery,
  useRemoveTourTypeMutation,
} = tourApi;
