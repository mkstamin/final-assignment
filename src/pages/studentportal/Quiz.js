import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Error from "../../components/ui/Error";
import {
  useAddQuizMarkMutation,
  useGetQuizQuery,
} from "../../features/quize/quizApi";
import useIsQuiz from "../../hooks/useIsQuizCheck";

const Quiz = () => {
  const { id } = useParams();
  const { name: student_name, id: student_id } = useSelector(
    (state) => state.auth.user
  );
  const { data: quizzes, isError, isLoading, error } = useGetQuizQuery(id);
  const [addQuizMark, { data: quizData, isSuccess }] = useAddQuizMarkMutation();

  const [answers, setAnswers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const isQuiz = useIsQuiz(id);

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const aQuizMark = 5;
    const { video_id, video_title } = quizzes[0] || {};
    const totalCorrect = answers.filter((correct) => correct.quizAns);
    const totalWrong = answers.filter((wrong) => !wrong.quizAns);

    const quizMark = {
      student_id,
      student_name,
      video_id,
      video_title,
      totalQuiz: quizzes.length,
      totalCorrect: totalCorrect.length,
      totalWrong: totalWrong.length,
      totalMark: quizzes.length * aQuizMark,
      mark: totalCorrect.length * aQuizMark,
    };

    addQuizMark(quizMark);

    setIsChecked(true);
  };

  const onChangeHandler = (quizId, optionId) => {
    const { options } = quizzes?.find((it) => it.id === quizId);
    const { isCorrect } = options?.find((o) => o.id == optionId);
    const findAns = answers?.find((a) => a.quizId == quizId);

    if (findAns === undefined) {
      setAnswers([...answers, { quizId, quizAns: isCorrect }]);
    } else {
      const replace = answers.map((ans) => {
        if (ans.quizId == quizId) {
          return { ...ans, quizAns: isCorrect };
        }
        return ans;
      });
      setAnswers(replace);
    }
  };

  useEffect(() => {
    if (isQuiz?.student_id) {
      setIsChecked(true);
    }
  }, [isQuiz?.student_id]);

  // decide what to render
  let content = null;
  let title = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && quizzes?.length === 0) {
    title = "No Title Found! 😊";
    content = <p>No quizzes found! 😊</p>;
  } else if (!isLoading && !isError && quizzes?.length > 0) {
    title = quizzes[0].video_title;
    content = quizzes.map((quiz) => (
      <div className="quiz" key={quiz.id}>
        <h4 className="question">{quiz.question}</h4>
        <div className="quizOptions">
          {quiz.options.map((option) => (
            <div key={option.id}>
              {!isChecked ? (
                <label htmlFor={`option${option.id}_q${quiz.id}`}>
                  <input
                    type={"radio"}
                    id={`option${option.id}_q${quiz.id}`}
                    name={quiz.question}
                    value={option.id}
                    onChange={() => onChangeHandler(quiz.id, option.id)}
                    required
                  />
                  {option.option}
                </label>
              ) : (
                <label htmlFor={`option${option.id}_q${quiz.id}`}>
                  <input
                    type={"radio"}
                    id={`option${option.id}_q${quiz.id}`}
                    value={undefined}
                    disabled={true}
                    checked={option.isCorrect}
                  />
                  {option.option}
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    ));
  }

  return (
    <>
      <NavBar />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
            {isQuiz?.student_id ? (
              <p className="text-2xl text-green-700 mt-2">
                You get {isQuiz.mark} marks out of {isQuiz.totalMark} 😊
              </p>
            ) : (
              ""
            )}
          </div>
          <form onSubmit={onsubmitHandler}>
            {/* <form> */}
            <div className="space-y-8 ">{content}</div>

            <button
              disabled={isChecked}
              className={`px-4 py-2 rounded-full block ml-auto mt-8  ${
                isChecked
                  ? "cursor-not-allowed bg-[cyan] text-gray-900 bg-opacity-40"
                  : "bg-[cyan] text-gray-900 hover:opacity-90 active:opacity-100 active:scale-95"
              }`}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Quiz;
