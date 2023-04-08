import React, { useEffect } from "react";
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

  const user = useSelector((state) => state.auth.user);

  const { data: assignmentMarks } = useGetAssignmentMarksQuery();
  const { data: quizzesMark } = useGetQuizzesMarkQuery();
  const dispatch = useDispatch();

  // for first gape show data
  const showTotalData = 20;

  const mergedMarks = mergedQuizMarksMarks?.map((quiz, i) => {
    const matchingAssignment = mergedAssignmentMarks?.find(
      (assignment) => assignment.student_id === quiz.student_id
    );
    return {
      id: i + 1,
      quiz: { ...quiz },
      assignment: { ...matchingAssignment },
      totalMark:
        (quiz?.mark ? quiz?.mark : 0) +
        (matchingAssignment?.mark ? matchingAssignment?.mark : 0),
    };
  });

  const studentMarksData = mergedMarks.sort(
    (a, b) => b.totalMark - a.totalMark
  );

  const findIndiVidual = studentMarksData.find(
    (m) => m?.quiz?.student_id === user?.id
  );

  const findRank = (mark) => {
    return studentMarksData.findIndex((itm) => itm.totalMark === mark) + 1;
  };

  useEffect(() => {
    dispatch(addAllAssignmentMarks(assignmentMarks));
  }, [dispatch, assignmentMarks]);

  useEffect(() => {
    dispatch(addAllQuizMarks(quizzesMark));
  }, [dispatch, quizzesMark]);

  // content
  let content = null;
  if (studentMarksData.length < 0) {
    content = (
      <tr>
        <td>Loading....</td>
      </tr>
    );
  }
  if (studentMarksData === undefined) {
    content = <Error message={"There was an error"} />;
  }
  if (studentMarksData.length > 0 && studentMarksData !== undefined) {
    content = studentMarksData?.slice(0, showTotalData)?.map((itm, i) => {
      const { assignment, quiz, totalMark } = itm;
      return (
        <tr key={i} className="border-b border-slate-600/50">
          <td className="table-td text-center">{findRank(totalMark)}</td>
          <td className="table-td text-center">{quiz.student_name}</td>
          <td className="table-td text-center">{quiz?.mark || 0}</td>
          <td className="table-td text-center">{assignment?.mark || 0}</td>
          <td className="table-td text-center">{totalMark}</td>
        </tr>
      );
    });
  }

  // Individual
  let individualContent = null;

  if (!findIndiVidual?.id && !findIndiVidual === undefined) {
    individualContent = (
      <tr>
        <td>Loading....</td>
      </tr>
    );
  }

  if (findIndiVidual === undefined) {
    individualContent = (
      <tr className="border-2 border-[cyan]">
        <td className="table-td text-center font-bold">{findRank(0)}</td>
        <td className="table-td text-center font-bold">{user?.name}</td>
        <td className="table-td text-center font-bold">0</td>
        <td className="table-td text-center font-bold">0</td>
        <td className="table-td text-center font-bold">0</td>
      </tr>
    );
  }

  if (findIndiVidual?.id && findIndiVidual !== undefined) {
    individualContent = (
      <tr className="border-2 border-[cyan]">
        <td className="table-td text-center font-bold">
          {findRank(findIndiVidual?.totalMark)}
        </td>
        <td className="table-td text-center font-bold">
          {findIndiVidual?.quiz?.student_name}
        </td>
        <td className="table-td text-center font-bold">
          {findIndiVidual?.quiz?.mark || 0}
        </td>
        <td className="table-td text-center font-bold">
          {findIndiVidual?.assignment?.mark || 0}
        </td>
        <td className="table-td text-center font-bold">
          {findIndiVidual?.totalMark}
        </td>
      </tr>
    );
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

              <tbody>{individualContent}</tbody>
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
