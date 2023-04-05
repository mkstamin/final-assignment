import { apiSlice } from "../api/apiSlice";
import { allVideos } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;

          dispatch(allVideos(res.data));
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
  }),
});

export const { useGetVideosQuery } = userApi;
