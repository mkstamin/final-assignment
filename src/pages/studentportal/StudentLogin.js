import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import learningportal from "../../assets/image/learningportal.svg";
import { useLoginMutation } from "../../features/auth/authApi";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: resError }] = useLoginMutation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const adminCheck = email.includes("admin");

    if (adminCheck) {
      setError("You don't have permission!");
    } else {
      login({
        email,
        password,
      });
    }
  };

  useEffect(() => {
    if (resError?.data) {
      setError(resError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/player");
    }
  }, [data, resError, navigate]);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={learningportal} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Student Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/registration"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Create New Account
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              disabled={isLoading}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentLogin;
