import { NextApiRequest, NextApiResponse } from "next";

type handler_type = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

export type { handler_type };
