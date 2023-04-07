import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";
import {
  useGetAssignmentQuery,
  useUpdateAssignmentMutation,
} from "../../features/assignment/assignmentApi";

const AssignmentEdit = () => {
  const { id } = useParams();
  const { data: assignment } = useGetAssignmentQuery(id);
  const [updateAssignment] = useUpdateAssignmentMutation();

  const [title, setTitle] = useState("");
  const [selectVideo, setSelectVideo] = useState("");
  const [mark, setMark] = useState(0);

  const navigate = useNavigate();

  const { title: assignmentTitle, video_title, totalMark } = assignment || {};

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      ...assignment,
      title,
      totalMark: mark * 1,
    };

    updateAssignment({ id, patch: data });

    navigate("/admin/assignment");
  };

  useEffect(() => {
    setTitle((prev) => assignmentTitle || prev);
    setSelectVideo((prev) => video_title || prev);
    setMark((prev) => totalMark || prev);
  }, [assignmentTitle, video_title, totalMark]);

  return (
    <>
      <AdminNavBar />

      <div className="flex flex-col space-y-6 border border-gray-800 p-10 bg-slate-950 w-2/5 rounded-lg m-auto mt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[cyan]">Edit</span> Assignment
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
              <input
                className="w-full py-[10px] px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={selectVideo}
                readOnly
                title="This field is read only!"
              />
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
          <div className="">
            <button
              className="px-5 font-bold py-3 border border-[cyan] text-[cyan] rounded-full text-sm hover:bg-[cyan] hover:text-gray-900"
              type="submit"
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AssignmentEdit;
