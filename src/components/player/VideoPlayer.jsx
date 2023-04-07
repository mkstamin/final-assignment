import moment from "moment/moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetQuizzesByVideoIdQuery } from "../../features/quize/quizApi";
import useIsAssignmentCheck from "../../hooks/useIsAssignmentCheck";
import useIsQuiz from "../../hooks/useIsQuizCheck";
import AssignmentSubmission from "../assignment/AssignmentSubmission";

const VideoPlayer = ({ setActiveModal, activeModal }) => {
  const [activeTab, setActiveTab] = useState("description");
  const singleVideo = useSelector((state) => state.users.video);

  const { id, url, title, createdAt, description } = singleVideo || {};

  const { data: quizzes, isLoading } = useGetQuizzesByVideoIdQuery(id);

  const isQuiz = useIsQuiz(id);
  const isAssignment = useIsAssignmentCheck(id);

  let isQuizzes = [];
  if (!isLoading) {
    isQuizzes = quizzes;
  }

  if (id === undefined) {
    return <div>Loading........</div>;
  }

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <iframe
        width="100%"
        className="aspect-video"
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </h1>
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {moment(createdAt).format("LL")}
        </h2>

        <div className="flex gap-4">
          <button
            className={`px-3 font-bold py-1 border border-[cyan] text-[cyan] ${
              activeTab === "description" ? "bg-[cyan] text-gray-900" : " "
            } rounded-full text-sm hover:bg-[cyan] hover:text-gray-900`}
            onClick={() => setActiveTab("description")}
          >
            ভিডিও ডেসক্রিপশন
          </button>

          <button
            // border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-gray-900
            className={`px-3 font-bold py-1 border ${
              isAssignment?.id
                ? "border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-gray-900"
                : "border-red-700 text-red-700 bg-transparent cursor-not-allowed"
            } ${
              activeTab === "assignment" ? "bg-[cyan] text-gray-900" : " "
            } rounded-full text-sm`}
            onClick={() => setActiveTab("assignment")}
            disabled={!isAssignment?.id ? true : false}
          >
            এসাইনমেন্ট {isAssignment?.id ? "আছে" : "নেই"}
          </button>

          <Link
            to={`/quiz/${id}`}
            target="_blank"
            className={`px-3 font-bold py-1 border rounded-full text-sm ${
              isQuizzes.length > 0
                ? !isQuiz?.id
                  ? "border-[cyan] text-[cyan] hover:bg-[cyan] hover:text-gray-900"
                  : "border-[cyan]  bg-[cyan] text-gray-900 opacity-50"
                : "border-red-700 text-red-700 pointer-events-none"
            }`}
          >
            {isQuizzes.length > 0
              ? !isQuiz?.id
                ? "কুইজে অংশগ্রহণ করুন"
                : "কুইজে অংশগ্রহণ করেছেন"
              : "কুইজ নেই"}
          </Link>
        </div>

        <div className="mt-4 ">
          <div
            className={`${activeTab === "description" ? "block" : "hidden"}`}
          >
            <p className="text-sm text-slate-400 leading-6">{description}</p>
          </div>

          <div className={`${activeTab === "assignment" ? "block" : "hidden"}`}>
            {isAssignment?.id ? (
              <AssignmentSubmission
                isAssignment={isAssignment}
                activeModal={activeModal}
                setActiveModal={setActiveModal}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
