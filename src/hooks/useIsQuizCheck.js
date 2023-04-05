import { useGetQuizMarkByVideoQuery } from "../features/quize/quizApi";

const localAuth = localStorage.getItem("auth");
const { id: student_id } = JSON.parse(localAuth)?.user;

const useIsQuizCheck = (videoId) => {
  const { data, isLoading, isError } = useGetQuizMarkByVideoQuery({
    studentId: student_id,
    videoId: videoId,
  });

  if (!isLoading && !isError) {
    return data;
  }

  return [];
};

export default useIsQuizCheck;
