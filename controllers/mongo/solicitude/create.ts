import { NextApiRequest, NextApiResponse } from "next";
import FormatedDate from "../../utils/formated_date";
import { BackupModel, SolicitudeModel, AuditoryModel } from "../../../database/schemas";
import { Pago } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pago = req.body as Pago;
  const userName = req.headers.username as string;
  const count: number = await BackupModel.countDocuments();

  // fetch the posts
  const soli = new SolicitudeModel({ ...pago, number: count + 1 });

  await soli.save();

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creó pago N°" + pago.number,
  });
  await auditory.save();

  const backup = new BackupModel({ pago: soli._id });

  await backup.save();

  return res.status(200).json({
    message: "Pago creado",
    success: true,
  });
}
