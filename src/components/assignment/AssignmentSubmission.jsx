import { useSelector } from "react-redux";
import { useGetAssignmentMarkForVideoByStudentQuery } from "../../features/assignment/assignmentApi";

const AssignmentSubmission = ({
  activeModal,
  setActiveModal,
  isAssignment,
}) => {
  const user = useSelector((state) => state.auth.user);

  const { data } = useGetAssignmentMarkForVideoByStudentQuery({
    assignmentId: isAssignment?.id,
    studentId: user?.id,
  });

  const assignments = data || [];
  const { status, mark } = assignments[0] || {};
  const { title, totalMark } = isAssignment;

  return (
    <div className="cla">
      <div className="flex justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        <button
          type="button"
          onClick={() => setActiveModal(true)}
          disabled={status ? true : false}
        >
          <span
            className={`text-sm font-bold px-4  py-2 border border-violet-900 bg-violet-900 ${
              status ? "opacity-25 cursor-not-allowed" : ""
            } text-white rounded-full`}
          >
            এসাইনমেন্ট জমা {status ? "দিয়েছেন" : "দিন"}
          </span>
        </button>
      </div>
      <span
        className={`px-4 font-bold py-2 rounded-full text-sm bg-emerald-900 text-white  ${
          status ? "opacity-50 bg-pink-500" : ""
        }`}
      >
        {status
          ? status === "published"
            ? `প্রাপ্ত নাম্বার - ${mark}`
            : "প্রাপ্ত নাম্বার পেন্ডিং"
          : `সর্বমোট নাম্বার -${totalMark}`}
      </span>
    </div>
  );
};

export default AssignmentSubmission;
