/* eslint-disable import/prefer-default-export */
import axios from "axios";

export const fetchAssesment = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/assesment-sessions`
    );
    return data?.data;
  } catch (error) {
    return error;
  }
};
