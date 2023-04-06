import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";
import { useAddVideoMutation } from "../../features/user/userApi";

const VideoAdd = () => {
  const [addVideo, { data: addVideoData }] = useAddVideoMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const date = new Date();
    const formattedDate = date.toISOString();
    // "id": 1,
    // "title": "Debounce Function in JavaScript - JavaScript Job Interview question",
    // "description": "In this video, I have explained about the debounce function in JavaScript. This is a common question interviewers ask at Job Interviews. If you watch this video carefully, you will understand what is debounce and how to handle it with custom debounce function.",
    // "url": "https://www.youtube.com/embed/dD9O8DnIBj4",
    // "views": "51.2K",
    // "duration": "5:30",
    // "createdAt": "2023-01-15T15:17:01.727Z"

    const data = {
      title,
      description,
      url,
      views: views / 1000 + "k",
      duration,
      createdAt: formattedDate,
    };

    addVideo(data);

    navigate("/admin/videos");
  };

  return (
    <>
      <AdminNavBar />

      <div className="flex flex-col space-y-6 border border-gray-800 p-10 bg-slate-950 w-2/5 rounded-lg m-auto mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[cyan]">Add New</span> Video
          </h1>
        </div>

        <form className="space-y-4 pt-2" onSubmit={onSubmitHandler}>
          <div className="">
            <label className="">Video Title</label>
            <div className="mt-1">
              <input
                type="text"
                required
                placeholder="your Video title"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <label className="">Video Url</label>
            <div className="mt-1">
              <input
                type={"text"}
                placeholder="https://www.youtube.com/embed/dD9O8DnIBj4"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <label className="">Total Views</label>
            <div className="mt-1">
              <input
                type={"number"}
                placeholder="100000"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <label className="">Video Duration</label>
            <div className="mt-1">
              <input
                type={"text"}
                placeholder="5:30"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <label className="">Video Description</label>
            <div className="mt-1">
              <textarea
                required
                placeholder="your Video description"
                rows={5}
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="">
            <button
              className="px-5 font-bold py-3 border border-[cyan] text-[cyan] rounded-full text-sm hover:bg-[cyan] hover:text-gray-900"
              type="submit"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VideoAdd;
