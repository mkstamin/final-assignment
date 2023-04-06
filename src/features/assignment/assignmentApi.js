import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
    }),
    updateAssignment: builder.mutation({
      query: ({ id, patch }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: patch,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updateData } = await queryFulfilled;

          dispatch(
            assignmentApi.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                const findAssignment = draft?.find((a) => a.id == arg.id);

                Object.assign(findAssignment, updateData);
              }
            )
          );

          dispatch(
            assignmentApi.util.updateQueryData(
              "getAssignment",
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

    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const removeAssignment = dispatch(
          assignmentApi.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              return draft.filter((a) => a.id !== arg);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          removeAssignment.undo();
        }
      },
    }),

    getAssignmentMarks: builder.query({
      query: () => "/assignmentMark",
    }),
    getAssignmentMark: builder.query({
      query: (id) => `/assignmentMark/${id}`,
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
    }),
    updateAssignmentMark: builder.mutation({
      query: ({ id, patch }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: patch,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updateData } = await queryFulfilled;

          dispatch(
            assignmentApi.util.updateQueryData(
              "getAssignmentMarks",
              undefined,
              (draft) => {
                const findMark = draft?.find((m) => m.id == arg.id);

                Object.assign(findMark, updateData);
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
  useAddAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMarkMutation,
  useGetAssignmentMarkQuery,
  useGetAssignmentMarksQuery,
  useLazyGetAssignmentMarkQuery,
  useUpdateAssignmentMarkMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
