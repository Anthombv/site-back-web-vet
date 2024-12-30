import { NextApiRequest, NextApiResponse } from "next";
import {
  AuditoryModel,
  BackupClientsModel,
  ClientModel,
} from "../../../database/schemas";
import { Cliente } from "../../../models";
import FormatedDate from "../../utils/formated_date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = req.body as Cliente;
  const userName = req.headers.username as string;
  const count: number = await BackupClientsModel.countDocuments();
  // fetch the posts
  const clientpost = new ClientModel({ ...client, number: count + 1 });

  await clientpost.save();

  const auditory = new AuditoryModel({
    date: FormatedDate(),
    user: userName,
    action: "Creo un Cliente: " + clientpost.name,
  });
  await auditory.save();

  const backup = new BackupClientsModel({ client: clientpost._id });

  await backup.save();

  return res.status(200).json({
    message: "Cliente Creado",
    success: true,
  });
}
