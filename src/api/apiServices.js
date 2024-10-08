import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const handleAddStudents = async (studentData) => {
  try {
    const result = await axios.post(
      BASE_URL + "/api/add/students",
      { studentData },
      { withCredentials: true }
    );
    return result.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw Error;
  }
};
