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
            enum: ["administrator", "veterinario"],
            default: "veterinario"
        },
        estado: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

//Cifrar las contraseñas antes de guardar
usuarioSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    };
    this.password = await bcrypt.hash(this.password, 12); // El 12 es el número de caracteres que va a tener el hash
})

//Comparar la contraseña ingresada con el hash
usuarioSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;