import { baseApi } from "../baseApi";
interface ISendOtp {
  email: string;
}

export interface IResponse<T> {
  massage: string;
  statusCode: number;
  success: boolean;
  data: T;
}

// export interface ILogInResponse {
//   message: string;
//   success: boolean;
//   status: number;
//   statusCode: number;
// }
// export interface ILogIn {
//   email: string;
//   Password: string;
// }
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logOut: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/logout",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
} = authApi;
