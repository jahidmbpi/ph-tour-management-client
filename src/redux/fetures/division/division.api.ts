import { baseApi } from "../baseApi";

export interface IResponse<T> {
  massage: string;
  statusCode: number;
  success: boolean;
  data: T;
}

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create-division",
        method: "POST",
        data: divisionData,
      }),
    }),

    removeDivision: builder.mutation({
      query: (division) => ({
        url: `/division/${division}`,
        method: "DELETE",
      }),
    }),

    divisionInfo: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddDivisionMutation,
  useRemoveDivisionMutation,
  useDivisionInfoQuery,
} = divisionApi;
