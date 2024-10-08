import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      const result = await axios.post(
        BASE_URL + "/api/auth/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      if (result.status === 200) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error);
    }
  };
  return (
    <>
      <div className=" flex items-center justify-center mt-10">
        <div className="card w-96 shadow-xl bg-slate-800">
          <div className="card-body text-center">
            <h2 className="card-title text-2xl font-thin text-violet-500">
              Signup Form
            </h2>
            <div className="card-actions justify-center">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">First Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs input-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Last Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs input-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Email</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs input-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-white">Password</span>
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs input-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {error && (
                <p className="text-sm text-red-600 font-thin text-center mt-2 mb-2 w-full">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-600 font-thin text-center mt-2 mb-2 w-full">
                  {success}
                </p>
              )}
              <button
                className="btn block btn-primary btn-sm mt-2"
                onClick={handleSignup}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
