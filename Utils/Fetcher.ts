/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from "axios";
import { showError } from "./Helpers/AntdHelper";

export async function FetcherPost<T = any, R = AxiosResponse<T, any>>(
  sessions: any,
  url: string,
  data: any,
) : Promise<R> {
  try {
    const response = await axios.post<T, R>(url, data, {
      headers: {
        Authorization: `Bearer ${sessions?.data?.accessToken}` ?? "",
      },
    });

    return response;
  } catch (error) {
    // @ts-ignore
    showError("error!", error?.response?.data?.message ?? error?.response?.data?.info ?? "Terjadi Kesalahan pada server!");
    // @ts-ignore
    throw (error?.response?.data?.message ?? error?.response?.data?.info ?? "Terjadi Kesalahan pada server!");
  }
}
