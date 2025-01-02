import { NextApiRequest, NextApiResponse } from "next";
import { VentaModel } from "../../../database/schemas";
import { Venta } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const ventas = await VentaModel.find({})

  return res.status(200).json({
    message: "todas las ventas",
    data: ventas as Array<Venta>,
    success: true,
  });
}