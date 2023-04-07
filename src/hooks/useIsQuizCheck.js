import { useSelector } from "react-redux";
import { useGetQuizMarkByVideoQuery } from "../features/quize/quizApi";

const useIsQuiz = (videoId) => {
  const { id: student_id } = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } = useGetQuizMarkByVideoQuery(
    {
      studentId: student_id,
      videoId: videoId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (!isLoading && !isError) {
    if (data[0]?.student_id === student_id) {
      return data[0];
    }
    return {};
  }

  return {};
};

export default useIsQuiz;
