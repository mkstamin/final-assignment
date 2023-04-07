import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import Error from "../../components/ui/Error";
import { useGetAssignmentMarksQuery } from "../../features/assignment/assignmentApi";
import {
  addAllAssignmentMarks,
  addAllQuizMarks,
} from "../../features/leaderboard/leaderboardSlice";
import { useGetQuizzesMarkQuery } from "../../features/quize/quizApi";

const Leaderboard = () => {
  const mergedAssignmentMarks = useSelector(
    (state) => state.leaderboard.assignmentMarks
  );
  const mergedQuizMarksMarks = useSelector(
    (state) => state.leaderboard.quizMarks
  );
  const { data: assignmentMarks } = useGetAssignmentMarksQuery();
  const { data: quizzesMark } = useGetQuizzesMarkQuery();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const mergedMarks = mergedQuizMarksMarks.map((quiz) => {
    const matchingAssignment = mergedAssignmentMarks.find(
      (assignment) => assignment.student_id === quiz.student_id
    );
    return {
      quiz: { ...quiz },
      assignment: { ...matchingAssignment },
    };
  });

  console.log(mergedMarks);

  useEffect(() => {
    dispatch(addAllAssignmentMarks(assignmentMarks));
  }, [dispatch, assignmentMarks]);

  useEffect(() => {
    dispatch(addAllQuizMarks(quizzesMark));
  }, [dispatch, quizzesMark]);

  let content = null;

  if (mergedMarks.length < 1) {
    content = (
      <tr>
        <td>Loading....</td>
      </tr>
    );
  }

  if (mergedMarks === undefined) {
    content = <Error message={"There was an error"} />;
  }

  if (mergedMarks.length > 0 && mergedMarks !== undefined) {
    content = mergedMarks?.map((itm, i) => {
      const { assignment, quiz } = itm;
      return (
        <tr key={i} className="border-b border-slate-600/50">
          <td className="table-td text-center">4</td>
          <td className="table-td text-center">{quiz.student_name}</td>
          <td className="table-td text-center">{quiz.mark}</td>
          <td className="table-td text-center">{assignment.mark}</td>
          <td className="table-td text-center">
            {quiz.totalMark + assignment.mark}
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <NavBar />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-2 border-[cyan]">
                  <td className="table-td text-center font-bold">4</td>
                  <td className="table-td text-center font-bold">Saad Hasan</td>
                  <td className="table-td text-center font-bold">50</td>
                  <td className="table-td text-center font-bold">50</td>
                  <td className="table-td text-center font-bold">100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
