import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";
import Error from "../../components/ui/Error";
import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../../features/user/userApi";

const AssignmentAdd = () => {
  const { data: videos } = useGetVideosQuery();
  const { data: assignments } = useGetAssignmentsQuery();
  const [addAssignment] = useAddAssignmentMutation();

  const [title, setTitle] = useState("");
  const [selectVideo, setSelectVideo] = useState("");
  const [mark, setMark] = useState(0);
  const [videoId, setVideoId] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionId = optionElement.getAttribute("data-id");

    setVideoId(optionId * 1);
    setSelectVideo(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const findAssignment = assignments?.find((a) => a.video_id === videoId);

    if (findAssignment?.id) {
      setError("There was already a assignment for this video!");
    } else {
      const data = {
        title,
        video_id: videoId,
        video_title: selectVideo,
        totalMark: mark,
      };

      console.log(data);

      addAssignment(data);
      navigate("/admin/assignment");
    }
  };

  return (
    <>
      <AdminNavBar />

      <div className="flex flex-col space-y-6 border border-gray-800 p-10 bg-slate-950 w-2/5 rounded-lg m-auto mt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[cyan]">Add New</span> Assignment
          </h1>
        </div>
        <form className="space-y-8 pb-5 pt-4" onSubmit={onSubmitHandler}>
          <div className="">
            <label className="">Assignment Title</label>
            <div className="mt-1">
              <input
                type="text"
                required
                placeholder="your assignment title"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={selectVideo}
                onChange={changeHandler}
              >
                <option value="" hidden>
                  Select Video
                </option>
                {/* {content} */}
                {videos?.map((video) => (
                  <option data-id={video.id} key={video.id}>
                    {video.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="">
            <label className="">Assignment Mark</label>
            <div className="mt-1">
              <input
                type={"number"}
                placeholder="assignment mark"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={mark}
                onChange={(e) => setMark(e.target.value)}
              />
            </div>
          </div>

          {error && <Error message={error} />}

          <div className="">
            <button
              className="px-5 font-bold py-3 border border-[cyan] text-[cyan] rounded-full text-sm hover:bg-[cyan] hover:text-gray-900"
              type="submit"
            >
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AssignmentAdd;
