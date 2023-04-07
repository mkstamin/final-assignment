import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";
import Error from "../../components/ui/Error";
import { useAddQuizMutation } from "../../features/quize/quizApi";
import { useGetVideosQuery } from "../../features/user/userApi";

const QuizAdd = () => {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();
  const [addQuiz] = useAddQuizMutation();

  const [videoTitle, setVideoTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [question, setQuestion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [optionOne, setOptionOne] = useState({
    option: "",
    isCorrect: "",
  });
  const [optionTwo, setOptionTwo] = useState({
    option: "",
    isCorrect: "",
  });
  const [optionThree, setOptionThree] = useState({
    option: "",
    isCorrect: "",
  });
  const [optionFour, setOptionFour] = useState({
    option: "",
    isCorrect: "",
  });

  const navigate = useNavigate();

  const onchangeHandler = (e) => {
    const targeted = e.target;

    switch (targeted.name) {
      case "videoTitle":
        const index = e.target.selectedIndex;
        const optionElement = e.target.childNodes[index];
        const optionId = optionElement.getAttribute("data-id");

        setVideoId(optionId * 1);
        setVideoTitle(targeted.value);
        break;
      case "optionOne":
        if (targeted.value === "true" || targeted.value === "false") {
          setOptionOne((prev) => ({ ...prev, isCorrect: targeted.value }));
        } else {
          setOptionOne((prev) => ({ ...prev, option: targeted.value }));
        }
        break;

      case "optionTwo":
        if (targeted.value === "true" || targeted.value === "false") {
          setOptionTwo((prev) => ({ ...prev, isCorrect: targeted.value }));
        } else {
          setOptionTwo((prev) => ({ ...prev, option: targeted.value }));
        }
        break;

      case "optionThree":
        if (targeted.value === "true" || targeted.value === "false") {
          setOptionThree((prev) => ({ ...prev, isCorrect: targeted.value }));
        } else {
          setOptionThree((prev) => ({ ...prev, option: targeted.value }));
        }
        break;

      case "optionFour":
        if (targeted.value === "true" || targeted.value === "false") {
          setOptionFour((prev) => ({ ...prev, isCorrect: targeted.value }));
        } else {
          setOptionFour((prev) => ({ ...prev, option: targeted.value }));
        }
        break;

      default:
        break;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      question,
      video_id: videoId,
      video_title: videoTitle,
      options: [
        {
          ...optionOne,
          id: 1,
          isCorrect: optionOne.isCorrect === "true" ? true : false,
        },
        {
          ...optionTwo,
          id: 2,
          isCorrect: optionTwo.isCorrect === "true" ? true : false,
        },
        {
          ...optionThree,
          id: 3,
          isCorrect: optionThree.isCorrect === "true" ? true : false,
        },
        {
          ...optionFour,
          id: 4,
          isCorrect: optionFour.isCorrect === "true" ? true : false,
        },
      ],
    };

    const findMultipleIsCorrect = data?.options.filter((o) => o.isCorrect);

    if (findMultipleIsCorrect.length > 1) {
      setErrorMessage("You can not set multiple correct answer");
    } else {
      addQuiz(data);

      navigate("/admin/quizzes");
    }
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = "Loading...";
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = "No videos found!";
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <option data-id={video.id} key={video.id}>
        {video.title}
      </option>
    ));
  }

  return (
    <>
      <AdminNavBar />

      <div className="flex flex-col space-y-6 border border-gray-800 p-10 bg-slate-950 w-2/5 rounded-lg m-auto mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[cyan]">Add New</span> Quiz
          </h1>
        </div>

        <form className="space-y-4 pt-2" onSubmit={onSubmitHandler}>
          <div className="">
            <label className="">Question</label>
            <div className="mt-1">
              <input
                type="text"
                required
                placeholder="your Video title"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <label className="">Select Video</label>
            <div className="mt-1">
              <select
                className="w-full py-[10px] px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                name="videoTitle"
                required
                value={videoTitle}
                onChange={onchangeHandler}
              >
                <option value="" hidden>
                  Select Video
                </option>
                {content}
              </select>
            </div>
          </div>
          <div className="">
            <label className="">Option One</label>
            <div className="flex items-center gap-4 mt-1">
              <input
                type={"text"}
                placeholder="option one title"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={optionOne.option}
                name="optionOne"
                onChange={onchangeHandler}
              />
              <select
                className="w-[200px] py-[10px] px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                name="optionOne"
                required
                value={optionOne.isCorrect}
                onChange={onchangeHandler}
              >
                <option value="" hidden>
                  Is Correct
                </option>

                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>
          <div className="">
            <label className="">Option Two</label>
            <div className="flex items-center gap-4 mt-1">
              <input
                type={"text"}
                placeholder="option one title"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={optionTwo.option}
                name="optionTwo"
                onChange={onchangeHandler}
              />
              <select
                className="w-[200px] py-[10px] px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                name="optionTwo"
                required
                value={optionTwo.isCorrect}
                onChange={onchangeHandler}
              >
                <option value="" hidden>
                  Is Correct
                </option>

                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>
          <div className="">
            <label className="">Option Three</label>
            <div className="flex items-center gap-4 mt-1">
              <input
                type={"text"}
                placeholder="option one title"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={optionThree.option}
                name="optionThree"
                onChange={onchangeHandler}
              />
              <select
                className="w-[200px] py-[10px] px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                name="optionThree"
                required
                value={optionThree.isCorrect}
                onChange={onchangeHandler}
              >
                <option value="" hidden>
                  Is Correct
                </option>

                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>
          <div className="">
            <label className="">Option Four</label>
            <div className="flex items-center gap-4 mt-1">
              <input
                type={"text"}
                placeholder="option one title"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={optionFour.option}
                name="optionFour"
                onChange={onchangeHandler}
              />
              <select
                className="w-[200px] py-[10px] px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                name="optionFour"
                required
                value={optionFour.isCorrect}
                onChange={onchangeHandler}
              >
                <option value="" hidden>
                  Is Correct
                </option>

                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>

          {errorMessage && <Error message={errorMessage} />}

          <div className="">
            <button
              className="px-5 font-bold py-3 border border-[cyan] text-[cyan] rounded-full text-sm hover:bg-[cyan] hover:text-gray-900"
              type="submit"
            >
              Add Quiz
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default QuizAdd;
