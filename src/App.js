import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/dashboard/AdminLogin";
import Assignment from "./pages/dashboard/Assignment";
import AssignmentAdd from "./pages/dashboard/AssignmentAdd";
import AssignmentEdit from "./pages/dashboard/AssignmentEdit";
import AssignmentMark from "./pages/dashboard/AssignmentMark";
import Dashboard from "./pages/dashboard/Dashboard";
import QuizAdd from "./pages/dashboard/QuizAdd";
import QuizEdit from "./pages/dashboard/QuizEdit";
import Quizzes from "./pages/dashboard/Quizzes";
import VideoAdd from "./pages/dashboard/VideoAdd";
import VideoEdit from "./pages/dashboard/VideoEdit";
import Videos from "./pages/dashboard/Videos";
import Leaderboard from "./pages/studentportal/Leaderboard";
import Player from "./pages/studentportal/Player";
import Quiz from "./pages/studentportal/Quiz";
import StudentLogin from "./pages/studentportal/StudentLogin";
import StudentReg from "./pages/studentportal/StudentReg";
import AdminRouter from "./router/AdminRouter";
import PrivateRouter from "./router/PrivateRouter";
import PublicRouter from "./router/PublicRouter";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Auth Checking...</div>
  ) : (
    <Router>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <PublicRouter>
                <StudentLogin />
              </PublicRouter>
            }
          />

          <Route
            path="registration"
            element={
              <PublicRouter>
                <StudentReg />
              </PublicRouter>
            }
          />
          <Route
            path="leaderboard"
            element={
              <PrivateRouter>
                <Leaderboard />
              </PrivateRouter>
            }
          />

          <Route
            path="player"
            element={
              <PrivateRouter>
                <Player />
              </PrivateRouter>
            }
          />
          <Route
            path="quiz/:id"
            element={
              <PrivateRouter>
                <Quiz />
              </PrivateRouter>
            }
          />
        </Route>

        <Route path="/admin">
          <Route
            index
            element={
              <PublicRouter>
                <AdminLogin />
              </PublicRouter>
            }
          />

          <Route
            path="dashboard"
            element={
              <AdminRouter>
                <Dashboard />
              </AdminRouter>
            }
          />

          <Route
            path="assignment"
            element={
              <AdminRouter>
                <Assignment />
              </AdminRouter>
            }
          />
          <Route
            path="add-assignment"
            element={
              <AdminRouter>
                <AssignmentAdd />
              </AdminRouter>
            }
          />
          <Route
            path="edit-assignment/:id"
            element={
              <AdminRouter>
                <AssignmentEdit />
              </AdminRouter>
            }
          />

          <Route
            path="assignment-mark"
            element={
              <AdminRouter>
                <AssignmentMark />
              </AdminRouter>
            }
          />
          <Route
            path="quizzes"
            element={
              <AdminRouter>
                <Quizzes />
              </AdminRouter>
            }
          />

          <Route
            path="add-quiz"
            element={
              <AdminRouter>
                <QuizAdd />
              </AdminRouter>
            }
          />

          <Route
            path="edit-quiz/:id"
            element={
              <AdminRouter>
                <QuizEdit />
              </AdminRouter>
            }
          />

          <Route
            path="videos"
            element={
              <AdminRouter>
                <Videos />
              </AdminRouter>
            }
          />
          <Route
            path="add-video"
            element={
              <AdminRouter>
                <VideoAdd />
              </AdminRouter>
            }
          />

          <Route
            path="edit-video/:id"
            element={
              <AdminRouter>
                <VideoEdit />
              </AdminRouter>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
