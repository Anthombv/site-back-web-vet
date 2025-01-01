import mongoose, { mongo, Schema } from "mongoose";
import {
  Auditory,
  Backup,
  Cita,
  Cliente,
  Especialidad,
  Factura,
  Mascota,
  Medico,
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

const EspecialidadSchema = new mongoose.Schema<Especialidad>(
  {
    nombre: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
EspecialidadSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
EspecialidadSchema.set("toJSON", {
  virtuals: true,
});

export const EspecialidadModel =
  mongoose.models.Especialidades ||
  mongoose.model("Especialidades", EspecialidadSchema);

const MedicosSchema = new mongoose.Schema<Medico>(
  {
    number: { type: Number },
    especialidad: { type: EspecialidadSchema },
    nombres: { type: String },
    correo: { type: String },
    telefono: { type: String },
    fechaNacimiento: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
MedicosSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MedicosSchema.set("toJSON", {
  virtuals: true,
});

export const MedicosModel =
  mongoose.models.Medicos || mongoose.model("Medicos", MedicosSchema);

const CitasSchema = new mongoose.Schema<Cita>(
  {
    number: { type: Number },
    cliente: { type: ClientSchema },
    mascota: { type: MascotaSchema },
    fecha: { type: String },
    hora: { type: String },
    diagnostico: { type: String },
    medico: { type: MedicosSchema },
    especialidad: { type: EspecialidadSchema },
    tratamiento: { type: String },
    detalle: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
CitasSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CitasSchema.set("toJSON", {
  virtuals: true,
});

export const CitaModel =
  mongoose.models.Citas || mongoose.model("Citas", CitasSchema);

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

const BackupMedicoSchema = new mongoose.Schema<Backup>(
  {
    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicos",
    },
  },
  { timestamps: true }
);

BackupMedicoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BackupMedicoSchema.set("toJSON", {
  virtuals: true,
});

export const BackupMedicosModel =
  mongoose.models.BackupsMedicos ||
  mongoose.model("BackupsMedicos", BackupMedicoSchema);

const BackupCitaSchema = new mongoose.Schema<Backup>(
  {
    cita: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citas",
    },
  },
  { timestamps: true }
);

BackupCitaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

BackupCitaSchema.set("toJSON", {
  virtuals: true,
});

export const BackupCitasModel =
  mongoose.models.BackupsCitas ||
  mongoose.model("BackupsCitas", BackupCitaSchema);

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
