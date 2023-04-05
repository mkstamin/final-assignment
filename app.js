const assignmentMark = [
  {
    id: 1,
    student_id: 2,
    student_name: "Saad Hasan",
    assignment_id: 1,
    title: "Assignment 1 - Implement Debounce Function",
    createdAt: "2021-01-15T15:17:01.727Z",
    totalMark: 100,
    mark: 90,
    repo_link: "https://github.com/Learn-with-Sumit/assignment-1",
    status: "published",
  },
  {
    id: 2,
    student_id: 2,
    student_name: "Saad Hasan",
    assignment_id: 1,
    title: "Assignment 2 - Implement Best Practices",
    createdAt: "2021-01-15T15:17:01.727Z",
    totalMark: 100,
    mark: 100,
    repo_link: "https://github.com/Learn-with-Sumit/assignment-1",
    status: "published",
  },
  {
    id: 4,
    student_id: 2,
    student_name: "Saad Hasan",
    assignment_id: 1,
    title: "Assignment 2 - Implement Best Practices",
    createdAt: "2021-01-15T15:17:01.727Z",
    totalMark: 100,
    mark: 100,
    repo_link: "https://github.com/Learn-with-Sumit/assignment-1",
    status: "published",
  },
  {
    id: 2,
    student_id: 3,
    student_name: "Akash Ahmed",
    assignment_id: 1,
    title: "Assignment 2 - Implement Best Practices",
    createdAt: "2021-01-15T15:17:01.727Z",
    totalMark: 100,
    mark: 50,
    repo_link: "https://github.com/Learn-with-Sumit/assignment-1",
    status: "published",
  },
  {
    id: 3,
    student_id: 3,
    student_name: "Akash Ahmed",
    assignment_id: 1,
    title: "Assignment 2 - Implement Best Practices",
    createdAt: "2021-01-15T15:17:01.727Z",
    totalMark: 100,
    mark: 70,
    repo_link: "https://github.com/Learn-with-Sumit/assignment-1",
    status: "pending",
  },
];

const quizMark = [
  {
    id: 1,
    student_id: 2,
    student_name: "Saad Hasan",
    video_id: 1,
    video_title:
      "Debounce Function in JavaScript - JavaScript Job Interview question",
    totalQuiz: 2,
    totalCorrect: 1,
    totalWrong: 1,
    totalMark: 10,
    mark: 5,
  },
  {
    id: 1,
    student_id: 2,
    student_name: "Saad Hasan",
    video_id: 2,
    video_title:
      "Debounce Function in JavaScript - JavaScript Job Interview question",
    totalQuiz: 2,
    totalCorrect: 2,
    totalWrong: 0,
    totalMark: 10,
    mark: 10,
  },
  {
    student_id: 3,
    student_name: "Akash Ahmed",
    video_id: 1,
    video_title:
      "Debounce Function in JavaScript - JavaScript Job Interview question",
    totalQuiz: 2,
    totalCorrect: 2,
    totalWrong: 0,
    totalMark: 10,
    mark: 10,
    id: 2,
  },
];

// const mergedAssignments = Object.values(
//   assignmentMark.reduce((acc, curr) => {
//     if (!acc[curr.student_id]) {
//       acc[curr.student_id] = { ...curr };
//     } else {
//       acc[curr.student_id].mark += curr.mark;
//     }
//     return acc;
//   }, {})
// );

/**================================================== *
 * ==========  sum Of Merged Marks  ========== *
 * ================================================== */
const filterByStatus = assignmentMark.filter((a) => a.status === "published");

const sumOfMergedMarks = Object.values(
  filterByStatus.reduce((acc, curr) => {
    if (!acc[curr.student_id]) {
      acc[curr.student_id] = {
        id: curr.id,
        student_id: curr.student_id,
        student_name: curr.student_name,
        assignment_id: curr.student_id,
        mark: curr.mark,
        status: curr.status,
      };
    } else {
      acc[curr.student_id].mark += curr.mark;
    }
    return acc;
  }, {})
);

const sumOfMergedMarks2 = Object.values(
  quizMark.reduce((acc, curr) => {
    if (!acc[curr.student_id]) {
      acc[curr.student_id] = {
        id: curr.id,
        student_id: curr.student_id,
        student_name: curr.student_name,
        totalQuiz: curr.totalQuiz,
        totalCorrect: curr.totalCorrect,
        totalWrong: curr.totalWrong,
        totalMark: curr.totalMark,
        mark: curr.mark,
      };
    } else {
      acc[curr.student_id].totalQuiz += curr.totalQuiz;
      acc[curr.student_id].totalCorrect += curr.totalCorrect;
      acc[curr.student_id].totalWrong += curr.totalWrong;
      acc[curr.student_id].totalMark += curr.totalMark;
      acc[curr.student_id].mark += curr.mark;
    }
    return acc;
  }, {})
);

// console.log(sumOfMergedMarks2);
/* =======  End of sum Of Merged Marks  ======= */

const mergedMarks = sumOfMergedMarks2.map((quiz) => {
  const matchingAssignment = sumOfMergedMarks.find(
    (assignment) => assignment.student_id === quiz.student_id
  );

  return {
    quizzes: { ...quiz },
    assignment: { ...matchingAssignment },
  };
});

console.log(mergedMarks);
