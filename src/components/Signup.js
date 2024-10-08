import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john@gmail.com");
  const [password, setPassword] = useState("123");

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
        <div className="card bg-base-200 w-96 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title">Signup Form</h2>
            <div className="card-actions justify-center">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
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
                  <span className="label-text">Last Name</span>
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
                  <span className="label-text">Email</span>
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
                  <span className="label-text">Password</span>
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
