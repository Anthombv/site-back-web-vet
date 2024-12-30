import { NextApiRequest, NextApiResponse } from "next";
import { Cliente } from "../../../models";
import FormatedDate from "../../utils/formated_date";
import { AuditoryModel, ClientModel } from "../../../database/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = req.body as Cliente;
  const userName = req.headers.username as string;

  const newSolicitude = (): Cliente => {
    return client;
  };

  const resp = await ClientModel.findOneAndUpdate(
    {
      _id: client.id,
    },
    newSolicitude()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Actualizo al Usuario:" + client.nombre,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Usuario no encontrado",
      success: false,
    });

  return res.status(200).json({
    message: "Usuario editado",
    success: true,
  });
}
