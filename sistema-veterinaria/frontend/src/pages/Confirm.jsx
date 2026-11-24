import { useState } from "react";
import { Link, useParams } from "react-router";
import logoDog from "../assets/dog-hand.webp";
import { confirmarCuenta } from "../services/authService";

export const Confirm = () => {
  const { token } = useParams();

  const [estado, setEstado] = useState("pendiente");
  const [mensaje, setMensaje] = useState("");

  const manejarConfirmacion = async () => {
    setEstado("cargando");

    try {
      const respuesta = await confirmarCuenta(token);

      setMensaje(respuesta.mensaje);
      setEstado("confirmado");
    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje ||
        "No se pudo confirmar la cuenta"
      );
      setEstado("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <img
        className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
        src={logoDog}
        alt="SmartVET"
      />

      <div className="flex flex-col items-center justify-center">

        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Confirmación de cuenta
        </p>

        <p className="md:text-lg lg:text-xl text-gray-600 mt-8 text-center">
          {mensaje || "Confirma tu correo para activar tu cuenta"}
        </p>

        {estado === "pendiente" && (
          <button
            onClick={manejarConfirmacion}
            className="p-3 m-5 bg-gray-600 text-white rounded-xl hover:bg-gray-900"
          >
            Confirmar mi cuenta
          </button>
        )}

        {estado === "cargando" && (
          <p className="mt-5">Confirmando cuenta...</p>
        )}

        {estado === "confirmado" && (
          <Link
            to="/login"
            className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:bg-gray-900"
          >
            Iniciar sesión
          </Link>
        )}

        {estado === "error" && (
          <p className="mt-3 text-red-600">
            Verifica el enlace recibido por correo.
          </p>
        )}

      </div>
    </div>
  );
};