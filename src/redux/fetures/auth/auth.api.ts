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
const authApi = baseApi.injectEndpoints({
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
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
        credentials: "include",
      }),
    }),
    verifyOtp: builder.mutation({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
