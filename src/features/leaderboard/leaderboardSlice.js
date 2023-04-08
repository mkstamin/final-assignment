import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentMarks: [],
  quizMarks: [],
};

const leaderboardSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    addAllAssignmentMarks: (state, action) => {
      const assignmentMarks = action.payload || [];

      const filterByStatus = assignmentMarks?.filter(
        (a) => a.status === "published"
      );

      const sumOfMergedAssignmentMarks = Object.values(
        filterByStatus?.reduce((acc, curr) => {
          if (!acc[curr.student_id]) {
            acc[curr.student_id] = {
              student_id: curr.student_id,
              student_name: curr.student_name,
              assignment_id: curr.student_id,
              mark: curr.mark * 1,
              status: curr.status,
            };
          } else {
            acc[curr.student_id].mark += curr.mark * 1;
          }
          return acc;
        }, {})
      );

      state.assignmentMarks = sumOfMergedAssignmentMarks;
    },
    addAllQuizMarks: (state, action) => {
      const quizMarks = action.payload || [];

      const sumOfMergedQuizMarks = Object.values(
        quizMarks.reduce((acc, curr) => {
          if (!acc[curr.student_id]) {
            acc[curr.student_id] = {
              student_id: curr.student_id,
              student_name: curr.student_name,
              totalQuiz: curr.totalQuiz * 1,
              totalCorrect: curr.totalCorrect * 1,
              totalWrong: curr.totalWrong * 1,
              totalMark: curr.totalMark * 1,
              mark: curr.mark * 1,
            };
          } else {
            acc[curr.student_id].totalQuiz += curr.totalQuiz * 1;
            acc[curr.student_id].totalCorrect += curr.totalCorrect * 1;
            acc[curr.student_id].totalWrong += curr.totalWrong * 1;
            acc[curr.student_id].totalMark += curr.totalMark * 1;
            acc[curr.student_id].mark += curr.mark * 1;
          }
          return acc;
        }, {})
      );

      state.quizMarks = sumOfMergedQuizMarks;
    },
  },
});

export const { addAllAssignmentMarks, addAllQuizMarks } =
  leaderboardSlice.actions;
export default leaderboardSlice.reducer;
