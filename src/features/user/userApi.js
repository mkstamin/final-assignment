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

    updateVideo: builder.mutation({
      query: ({ id, patch }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: patch,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updateData } = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData("getVideos", undefined, (draft) => {
              const findVideo = draft?.find((v) => v.id == arg.id);
              Object.assign(findVideo, updateData);
            })
          );

          dispatch(
            userApi.util.updateQueryData(
              "getVideo",
              arg?.id.toString(),
              (draft) => {
                Object.assign(draft, updateData);
              }
            )
          );
        } catch (err) {
          console.log(err.message);
        }
      },
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const removeVideo = dispatch(
          userApi.util.updateQueryData("getVideos", undefined, (draft) => {
            return draft.filter((v) => v.id !== arg);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          removeVideo.undo();
        }
      },
    }),
  }),
});

export const {
  useDeleteVideoMutation,
  useUpdateVideoMutation,
  useGetVideosQuery,
  useAddVideoMutation,
  useGetVideoQuery,
} = userApi;
