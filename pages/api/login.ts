// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { rejectNull, setSession } from "../../Utils/Helpers/HelperServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (
    rejectNull(req.body.username, "username", res)
    && rejectNull(req.body.password, "password", res)
  ) {
    const { username } = req.body;
    const { password } = req.body;
    const datar = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      username,
      password
    });
    if (datar?.data?.statusCode === 200) {
      const sessionResult = await setSession(
        req,
        res,
        JSON.stringify(datar?.data?.data),
        process.env.APPNAME ?? "c3budimanstarter",
      );
      if (sessionResult?.code === 0) {
        return res.status(200).json({
          code: 0,
          info: "Login Suceed",
          data: datar?.data?.data,
          token: sessionResult,
        });
      }
      //  if something went wrong when setting our session...
      return res.status(400).json(sessionResult);
    }
    //  if something went wrong when hitting the api...
    return res.status(datar?.status).json(datar?.data);
  }
  return res.status(401).json({ message: "Invalid credentials" });
}
