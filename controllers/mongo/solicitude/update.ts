import { NextApiRequest, NextApiResponse } from "next";
import { Pago } from "../../../models";
import { AuditoryModel, SolicitudeModel } from "../../../database/schemas";
import FormatedDate from "../../utils/formated_date";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const solicitude = req.body as Pago;
  const userName = req.headers.username as string;
  const role = req.headers.role as string;

  const newSolicitude = (): Pago => {
    return solicitude;
  };

  const resp = await SolicitudeModel.findOneAndUpdate(
    {
      _id: solicitude.id,
    },
    newSolicitude()
  );

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Edito la Solicitud de IC" + solicitude.number,
  });
  await auditory.save();

  if (resp === null)
    return res.status(500).json({
      message: "Solicitud no encontrada",
      success: false,
    });

  return res.status(200).json({
    message: "Solicitud editada",
    success: true,
  });
}