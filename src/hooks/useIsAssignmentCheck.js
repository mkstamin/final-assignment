import { useGetAssignmentByVideoIdQuery } from "../features/assignment/assignmentApi";

const useIsAssignmentCheck = (videoId) => {
  const { data, isLoading, isError } = useGetAssignmentByVideoIdQuery(videoId, {
    refetchOnMountOrArgChange: true,
  });

  if (!isLoading && !isError) {
    if (data[0]?.video_id === videoId) {
      return data[0];
    }
    return {};
  }

  return {};
};

export default useIsAssignmentCheck;
