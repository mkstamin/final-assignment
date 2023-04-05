import { useState } from "react";
import NavBar from "../../components/NavBar";
import AssignmentSubmissionModal from "../../components/assignment/AssignmentSubmissionModal";
import Video from "../../components/player/Video";
import VideoPlayer from "../../components/player/VideoPlayer";
import Error from "../../components/ui/Error";
import { useGetVideosQuery } from "../../features/user/userApi";

const Player = () => {
  const [activeModal, setActiveModal] = useState(false);

  const { data: videos, isError, isLoading, error } = useGetVideosQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <p>No videos found!</p>;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return (
    <div className="relative">
      <AssignmentSubmissionModal
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />

      <NavBar />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <VideoPlayer
              activeModal={activeModal}
              setActiveModal={setActiveModal}
            />

            <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
              {content}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Player;
