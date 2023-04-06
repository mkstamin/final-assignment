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
    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: addData } = await queryFulfilled;

          dispatch(
            userApi.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(addData);
            })
          );
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
  }),
});

export const { useGetVideosQuery, useAddVideoMutation, useGetVideoQuery } =
  userApi;
