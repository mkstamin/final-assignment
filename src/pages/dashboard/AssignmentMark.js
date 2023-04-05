import moment from "moment";
import { useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import Error from "../../components/ui/Error";
import {
  useGetAssignmentMarksQuery,
  useUpdateAssignmentMarkMutation,
} from "../../features/assignment/assignmentApi";

const AssignmentMark = () => {
  const {
    data: assignmentMarks,
    isError,
    isLoading,
    error,
  } = useGetAssignmentMarksQuery();
  const [updateAssignmentMark, { data }] = useUpdateAssignmentMarkMutation();

  const [inputMark, setInputMark] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");

  const pending = assignmentMarks?.filter((a) => a?.status === "pending");
  const published = assignmentMarks?.filter((a) => a?.status === "published");

  const updateMark = (id) => {
    if (inputMark > 100) {
      setErrorMessage("You Can not set Marks More then 100!");
    } else {
      const findMark = assignmentMarks?.find((a) => a.id === id);

      updateAssignmentMark({
        id,
        patch: {
          ...findMark,
          mark: inputMark,
          status: "published",
        },
      });
    }
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <p>No assignmentMarks found!</p>;
  } else if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = assignmentMarks.map((mark, i) => (
      <tr key={i}>
        <td className="table-td">{mark.title}</td>
        <td className="table-td"> {moment(mark.createdAt).format("lll")}</td>
        <td className="table-td">{mark.student_name}</td>
        <td className="table-td">{mark.repo_link}</td>
        <td className="table-td input-mark">
          {mark.status === "published" ? (
            <td className="table-td">{mark.mark}</td>
          ) : (
            <>
              <input
                max="100"
                value={inputMark}
                onChange={(e) => setInputMark(e.target.value)}
              />
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                onClick={() => updateMark(mark.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </>
          )}
        </td>
      </tr>
    ));
  }

  return (
    <>
      <AdminNavBar />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{assignmentMarks?.length}</span>
              </li>
              <li>
                Pending <span>{pending?.length}</span>
              </li>
              <li>
                Mark Sent <span>{published?.length}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                  {/* <tr>
                    <td className="table-td">
                      Assignment 1 - Implement Debounce Function
                    </td>
                    <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                    <td className="table-td">Saad Hasan</td>
                    <td className="table-td">
                      https://github.com/Learn-with-Sumit/assignment-1
                    </td>
                    <td className="table-td input-mark">
                      <input max="100" value="100" />
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-td">
                      Assignment 2 - Implement Best Practices
                    </td>
                    <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                    <td className="table-td">Akash Ahmed</td>
                    <td className="table-td">
                      https://github.com/Learn-with-Sumit/assignment-1
                    </td>
                    <td className="table-td">50</td>
                  </tr>
                  <tr>
                    <td className="table-td">
                      Assignment 1 - Scoreboard Application
                    </td>
                    <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                    <td className="table-td">Ferdous</td>
                    <td className="table-td">
                      https://github.com/Learn-with-Sumit/assignment-1
                    </td>
                    <td className="table-td">100</td>
                  </tr>

                  <tr>
                    <td className="table-td">
                      Assignment 1 - Scoreboard Application
                    </td>
                    <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                    <td className="table-td">Saad Hasan</td>
                    <td className="table-td">
                      https://github.com/Learn-with-Sumit/assignment-1
                    </td>
                    <td className="table-td">100</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssignmentMark;
