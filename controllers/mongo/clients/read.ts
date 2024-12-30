import { NextApiRequest, NextApiResponse } from "next";
import { ClientModel } from "../../../database/schemas";
import { Cliente } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  // fetch the posts
  const solicitude = await ClientModel.findById(id, { password: 0 })

  return res.status(200).json({
    message: "un Cliente",
    data: solicitude as Cliente,
    success: true,
  });
}