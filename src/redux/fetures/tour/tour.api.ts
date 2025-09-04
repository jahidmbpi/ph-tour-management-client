import { baseApi } from "../baseApi";

export interface IResponse<T> {
  massage: string;
  statusCode: number;
  success: boolean;
  data: T;
}

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourName) => ({
        url: "/tourType/create-tour-type",
        method: "POST",
        data: tourName,
      }),
    }),

    tourTypeInfo: builder.query({
      query: () => ({
        url: "/tourType/getalltourType",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddTourTypeMutation, useTourTypeInfoQuery } = tourApi;
