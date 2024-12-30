import { NextApiRequest, NextApiResponse } from "next";
import { ClientModel } from "../../../database/schemas";
import { Cliente } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const solicitudes = await ClientModel.find({}, { password: 0 })

  return res.status(200).json({
    message: "todas los Clientes",
    data: solicitudes as Array<Cliente>,
    success: true,
  });
}