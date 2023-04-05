import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  video: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    allVideos: (state, action) => {
      state.videos = action.payload;
      state.video = action.payload[0];
    },
    singleVideo: (state, action) => {
      const findVideo = state.videos.find((v) => v.id === action.payload);
      state.video = findVideo;
    },
  },
});

export const { allVideos, singleVideo } = userSlice.actions;
export default userSlice.reducer;
