import moment from "moment/moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AssignmentSubmission from "../assignment/AssignmentSubmission";

const VideoPlayer = ({ setActiveModal, activeModal }) => {
  const [activeTab, setActiveTab] = useState("description");
  const singleVideo = useSelector((state) => state.users.video);

  if (singleVideo.id === undefined) {
    return <div>Loading........</div>;
  }

  const { id, url, title, createdAt, description } = singleVideo;

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
            className={`px-3 font-bold py-1 border border-red-700 text-red-700 cursor-not-allowed ${
              activeTab === "assignment" ? "bg-[cyan] text-gray-900" : " "
            } rounded-full text-sm`}
            onClick={() => setActiveTab("assignment")}
            // disabled={true}
          >
            এসাইনমেন্ট নেই
          </button>

          <Link
            to={`/quiz/${id}`}
            target="_blank"
            className="px-3 font-bold py-1 border border-[cyan] text-[cyan] rounded-full text-sm hover:bg-[cyan] hover:text-gray-900"
          >
            কুইজে অংশগ্রহণ করুন
          </Link>
        </div>

        <div className="mt-4 ">
          <div
            className={`${activeTab === "description" ? "block" : "hidden"}`}
          >
            <p className="text-sm text-slate-400 leading-6">{description}</p>
          </div>

          <div className={`${activeTab === "assignment" ? "block" : "hidden"}`}>
            <AssignmentSubmission
              activeModal={activeModal}
              setActiveModal={setActiveModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
