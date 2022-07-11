/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from "axios";

export const fetchStatusFinding = async <
  T = any,
  R = AxiosResponse<T, any>
>(): Promise<R> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/status-finding`
    );
    return data;
  } catch (error) {
    // @ts-ignore
    throw (error?.response?.data?.message ?? error?.response?.data?.info ?? "Terjadi Kesalahan pada server!");
  }
};
