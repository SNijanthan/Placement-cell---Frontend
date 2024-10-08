import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        BASE_URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(result?.data?.data);
      if (!result.status === 200) return;
      dispatch(addUser(result?.data?.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error);
    }
  };
  return (
    <>
      <div className="hero min-h-screen bg-gray-200">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl -mt-28">
          <form className="card-body bg-slate-800 rounded-lg">
            <h1 className=" text-2xl font-thin text-violet-500">LOGIN</h1>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 font-bold text-center mt-2 -mb-2">
                {error}
              </p>
            )}
            <p className="text-white mt-3 -mb-2">
              New to platform{" "}
              <Link to="/signup" className="link link-info">
                Signup
              </Link>{" "}
              here !
            </p>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
