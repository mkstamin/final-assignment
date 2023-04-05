const AssignmentSubmissionModal = ({ activeModal, setActiveModal }) => {
  return (
    <div
      className={`absolute bg-slate-950 w-full h-full bg-opacity-95  items-center justify-center ${
        activeModal ? "flex" : " hidden"
      }`}
    >
      <div className="flex flex-col space-y-6 border border-gray-800 p-10 bg-slate-950 w-2/5 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[cyan]">এসাইনমেন্ট জমা</span> দিন
          </h1>
          <button
            className="text-white -mt-12 -mr-2 text-2xl"
            onClick={() => setActiveModal(false)}
          >
            🗙
          </button>
        </div>
        <form className="space-y-8 pb-5 pt-4">
          <div className="">
            <label className="">
              গিটহাব রিপোসিটরি লিঙ্ক
              <span className="" aria-hidden="true">
                {" "}
                *
              </span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                required
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                //   value=""
              />
            </div>
          </div>
          <div className="">
            <label className="">হোস্টেড ওয়েবসাইট লাইভ লিঙ্ক</label>
            <div className="mt-1">
              <input
                type="text"
                className="w-full py-2 px-4 rounded-lg outline-none text-white font-semibold bg-slate-800"
                //   value=""
              />
            </div>
          </div>
          <div className="">
            <button
              className="px-3 font-bold py-1 border border-[cyan] text-[cyan] rounded-full text-sm hover:bg-[cyan] hover:text-gray-900"
              type="submit"
            >
              এসাইনমেন্ট জমা দিন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmissionModal;
