import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/dashboard/AdminLogin";
import Assignment from "./pages/dashboard/Assignment";
import AssignmentMark from "./pages/dashboard/AssignmentMark";
import Dashboard from "./pages/dashboard/Dashboard";
import Quizzes from "./pages/dashboard/Quizzes";
import Videos from "./pages/dashboard/Videos";
import Leaderboard from "./pages/studentportal/Leaderboard";
import Player from "./pages/studentportal/Player";
import Quiz from "./pages/studentportal/Quiz";
import StudentLogin from "./pages/studentportal/StudentLogin";
import StudentReg from "./pages/studentportal/StudentReg";
import PadminR from "./router/AdminRouter";
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
              <PadminR>
                <Dashboard />
              </PadminR>
            }
          />
          <Route
            path="assignment"
            element={
              <PadminR>
                <Assignment />
              </PadminR>
            }
          />
          <Route
            path="assignment-mark"
            element={
              <PadminR>
                <AssignmentMark />
              </PadminR>
            }
          />
          <Route
            path="quizzes"
            element={
              <PadminR>
                <Quizzes />
              </PadminR>
            }
          />
          <Route
            path="videos"
            element={
              <PadminR>
                <Videos />
              </PadminR>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
