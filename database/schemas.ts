import mongoose, { mongo, Schema } from "mongoose";
import {
  Auditory,
  Backup,
  Cliente,
  Factura,
  Mascota,
  Pago,
  Usuario,
} from "../models";

const UserSchema = new mongoose.Schema<Usuario>(
  {
    number: { type: Number },
    usuario: { type: String, unique: true },
    contraseña: { type: String },
    nombre: { type: String },
    correo: { type: String },
    identificacion: { type: String },
    telefono: { type: String },
    rol: { type: Number },
    estado: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set("toJSON", {
  virtuals: true,
});

export const UserModel =
  mongoose.models.Users || mongoose.model("Users", UserSchema);

const MascotaSchema = new mongoose.Schema<Mascota>(
  {
    number: { type: Number },
    nombre: { type: String },
    tipo: { type: String },
    raza: { type: String },
    fechaNacimiento: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
MascotaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MascotaSchema.set("toJSON", {
  virtuals: true,
});

export const MascotaModel =
  mongoose.models.Mascotas || mongoose.model("Mascotas", MascotaSchema);

const ClientSchema = new mongoose.Schema<Cliente>(
  {
    number: { type: Number },
    nombre: { type: String },
    apellidos: { type: String },
    cedula: { type: String, unique: true },
    fechaNacimiento: { type: String },
    telefono: { type: String },
    correo: { type: String },
    mascotas: { type: [MascotaSchema] },
  },
  { timestamps: true }
);

// Duplicate the ID field.
ClientSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ClientSchema.set("toJSON", {
  virtuals: true,
});

export const ClientModel =
  mongoose.models.Clientes || mongoose.model("Clientes", ClientSchema);

const FactureSchema = new mongoose.Schema<Factura>(
  {
    nombreProveedor: { type: String },
    ruc: { type: String },
    numeroFactura: { type: String },
    valorFactura: { type: Number },
    fechaFactura: { type: String },
    detalleFactura: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
FactureSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
FactureSchema.set("toJSON", {
  virtuals: true,
});

const SolicitudeSchema = new mongoose.Schema<Pago>(
  {
    number: { type: Number },
    fechaCreacion: { type: String },
    solicitante: { type: String },
    facturas: { type: [FactureSchema] },
    valorTotal: { type: Number },
  },
  { timestamps: true }
);

// Duplicate the ID field.
SolicitudeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Calculate total from factures.
SolicitudeSchema.virtual("total").get(function () {
  let total = 0;
  this.facturas.forEach(
    (element: Factura) => (total += element.valorFactura ?? 0)
  );
  return total;
});

// Ensure virtual fields are serialised.
SolicitudeSchema.set("toJSON", {
  virtuals: true,
});

export const SolicitudeModel =
  mongoose.models.Solicitudes ||
  mongoose.model("Solicitudes", SolicitudeSchema);

const BackupSchema = new mongoose.Schema<Backup>(
  {
    pagos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "solicitudes",
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
BackupSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
BackupSchema.set("toJSON", {
  virtuals: true,
});

export const BackupModel =
  mongoose.models.Backups || mongoose.model("Backups", BackupSchema);

const BackupClientSchema = new mongoose.Schema<Backup>(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clientes",
    },
  },
  { timestamps: true }
);

BackupClientSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BackupClientSchema.set("toJSON", {
  virtuals: true,
});

export const BackupClientsModel =
  mongoose.models.BackupsClients ||
  mongoose.model("BackupsClients", BackupClientSchema);

const AuditorySchema = new mongoose.Schema<Auditory>(
  {
    date: { type: String },
    user: { type: String },
    action: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
AuditorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
AuditorySchema.set("toJSON", {
  virtuals: true,
});

export const AuditoryModel =
  mongoose.models.Auditory || mongoose.model("Auditory", AuditorySchema);
