import { NextApiRequest, NextApiResponse } from "next";
import { PagoModel } from "../../../database/schemas";
import { Pago } from "../../../models";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fetch the posts
  const pagos = await PagoModel.find({})

  return res.status(200).json({
    message: "todos los pagos",
    data: pagos as Array<Pago>,
    success: true,
  });
}