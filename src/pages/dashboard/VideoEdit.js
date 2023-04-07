import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";
import {
  useGetVideoQuery,
  useUpdateVideoMutation,
} from "../../features/user/userApi";

const VideoEdit = () => {
  const { id } = useParams();
  const { data: video } = useGetVideoQuery(id);
  const [updateVideo] = useUpdateVideoMutation();

  const navigate = useNavigate();

  const {
    title: videoTitle,
    description: videoDescription,
    url: videoUrl,
    views: videoViews,
    duration: videoDuration,
  } = video || {};

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      ...video,
      title,
      description,
      url,
      views: views / 1000 + "K",
      duration,
    };

    updateVideo({ id, patch: data });

    navigate("/admin/videos");
  };

  useEffect(() => {
    setTitle(videoTitle || "");
    setUrl(videoUrl || "");
    setViews(() => videoViews?.slice(0, -1) * 1000 || "");
    setDuration(videoDuration || "");
    setDescription(videoDescription || "");
  }, [videoTitle, videoUrl, videoViews, videoDuration, videoDescription]);

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
              Update Video
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VideoEdit;
