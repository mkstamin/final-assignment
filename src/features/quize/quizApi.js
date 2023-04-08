import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => ({
        url: "/quizzes",
        method: "GET",
      }),
    }),

    getQuiz: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "GET",
      }),
    }),

    getQuizzesByVideoId: builder.query({
      query: (id) => ({
        url: `/quizzes?video_id=${id}`,
        method: "GET",
      }),
    }),

    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: addData } = await queryFulfilled;

          dispatch(
            quizApi.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(addData);
            })
          );
        } catch (err) {
          console.log(err.message);
        }
      },
    }),

    updateQuiz: builder.mutation({
      query: ({ id, patch }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: patch,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updateData } = await queryFulfilled;
          dispatch(
            quizApi.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const findQuiz = draft?.find((q) => q.id == arg.id);
              Object.assign(findQuiz, updateData);
            })
          );

          dispatch(
            quizApi.util.updateQueryData(
              "getQuiz",
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

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const removeQuiz = dispatch(
          quizApi.util.updateQueryData("getQuizzes", undefined, (draft) => {
            return draft.filter((q) => q.id !== arg);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          removeQuiz.undo();
        }
      },
    }),

    getQuizzesMark: builder.query({
      query: () => ({
        url: "/quizMark",
        method: "GET",
      }),
    }),

    // @TODO:
    getQuizMarkByVideo: builder.query({
      query: ({ studentId, videoId }) => ({
        url: `/quizMark?student_id=${studentId}&video_id=${videoId}`,
        method: "GET",
      }),
    }),

    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: addData } = await queryFulfilled;

          dispatch(
            quizApi.util.updateQueryData(
              "getQuizzesMark",
              undefined,
              (draft) => {
                draft.push(addData);
              }
            )
          );
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesMarkQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useAddQuizMutation,
  useGetQuizzesQuery,
  useGetQuizQuery,
  useAddQuizMarkMutation,
  useGetQuizMarkByVideoQuery,
  useGetQuizzesByVideoIdQuery,
} = quizApi;
