const AssignmentSubmission = ({ activeModal, setActiveModal }) => {
  return (
    <div className="cla">
      <div className="flex justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Batch 2 - Final Exam - Learning Portal
        </h1>
        <button type="button" onClick={() => setActiveModal(true)}>
          <span className="text-sm font-bold px-4  py-2 border border-violet-900 bg-violet-900 text-white rounded-full">
            {" "}
            এসাইনমেন্ট জমা দিন
          </span>
        </button>
      </div>
      <span className="px-4 font-bold py-2 rounded-full text-sm bg-emerald-900 text-white">
        সর্বমোট নাম্বার - ১০০
      </span>
      <div className="">{/* <AssignmentSubmissionModal /> */}</div>
    </div>
  );
};

export default AssignmentSubmission;
