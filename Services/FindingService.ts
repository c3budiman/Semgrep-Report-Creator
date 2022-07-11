/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { UpdateFindingResponse } from "../Types/FindingsResponse";

export const fetchFinding = async (
  limit: number,
  offset: number,
  sessionsId: string
) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/findings`,
      {
        params: {
          limit,
          offset,
          sessionsId,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchSummary = async (sessionsId: string, idStatus?: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/findings/summary`,
      {
        params: {
          sessionsId,
          idStatus,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateFinding = async ({
  id,
  githubPath,
  message,
  cwe,
  owasp,
  references,
  severity,
  sessionsId,
  idStatus,
  isFalsePositive,
  assesmentWord,
}: {
  id: string;
  githubPath?: string;
  message?: string;
  cwe?: string;
  owasp?: string;
  references?: string;
  severity?: string;
  sessionsId?: string;
  idStatus?: string;
  isFalsePositive?: boolean;
  assesmentWord?: string;
}) : Promise<UpdateFindingResponse> => {
  try {
    const { data } = await axios.put<UpdateFindingResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/findings/${id}`,
      {
        githubPath,
        message,
        cwe,
        owasp,
        references,
        severity,
        sessionsId,
        idStatus,
        isFalsePositive,
        assesmentWord,
      }
    );
    return data;
  } catch (error) {
    // @ts-ignore
    throw (error?.response?.data?.message ?? error?.response?.data?.info ?? "Terjadi Kesalahan pada server!");
  }
};
