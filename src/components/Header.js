import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    try {
      // Make the GET request to download the file
      const response = await axios.get(BASE_URL + "/api/results/download", {
        responseType: "blob", // Required to handle file download
        withCredentials: true,
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "results.xlsx"); // Define the file name
      document.body.appendChild(link);
      link.click();

      // Clean up the link element
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error while downloading the file:", error);
    }
  };

  return (
    <>
      {user ? (
        <div className="navbar bg-gray-300">
          <div className="flex-1">
            <p className="btn btn-ghost text-xl">daisyUI</p>
          </div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1 mr-28">
              Options
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content mt-6 menu bg-base-300 rounded-box z-[1] w-44 p-2 shadow"
            >
              <li>
                <a>Add Students</a>
              </li>
              <li>
                <a>Add Interview</a>
              </li>
              <li>
                <p onClick={handleDownload}>Download Report</p>
              </li>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar bg-gray-300">
          <div className="navbar-start"></div>
          <div className="navbar-center">
            <p className="btn btn-ghost text-xl text-violet-600 font-bold -ml-20">
              Placement Cell
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
