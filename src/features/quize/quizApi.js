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
      query: (videoId) => ({
        url: `/quizzes?video_id=${videoId}`,
        method: "GET",
      }),
    }),

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
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useAddQuizMarkMutation,
  useGetQuizMarkByVideoQuery,
} = quizApi;
