import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
  assignment: {},
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    allAssignment: (state, action) => {
      state.assignments = action.payload;
    },
    assignmentByVideoId: (state, action) => {
      state.assignment = action.payload;
    },
  },
});

export const { allAssignment, assignmentByVideoId } = assignmentSlice.actions;
export default assignmentSlice.reducer;
