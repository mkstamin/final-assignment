import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          );
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: res.data.accessToken,
              user: res.data.user,
            })
          );
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } =
  authApi;
