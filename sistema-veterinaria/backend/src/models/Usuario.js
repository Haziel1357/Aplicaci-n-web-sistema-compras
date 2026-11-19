import mongoose from "mongoose"; 
import bcrypt from "bcrypt"; 

const usuarioSchema = new mongoose.Schema(  
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    direccion: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    celular: {
      type: String,
      required: true,
      trim: true,
      match: /^[0-9]{10}$/
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },

    rol: {
      type: String,
      enum: ["administrador", "veterinario"],
      default: "veterinario"
    },

    estado: {
      type: Boolean,
      default: true
    },
    //Confirmación del correo
    correoConfirmado: {
      type: Boolean,
      default: false
    },
    tokenConfirmacion: { //almacena un tokenn que va a permitir verificar la cuenta con un enlace enviado al correo
      type: String,
      select: false
    },
    tokenConfirmacionExpira: {
      type: Date,
      select: false
    }
  },
  {
    timestamps: true
  }
);

usuarioSchema.pre("save", async function () {

  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);

});

usuarioSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;

