import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router";
import { registrarUsuario } from "../services/authService";

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        celular: "",
        correo: "",
        password: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");
        setCargando(true);

        try {
            const respuesta = await registrarUsuario(form);
            setMensaje(respuesta.mensaje);
            setForm({
                nombre: "",
                apellido: "",
                direccion: "",
                celular: "",
                correo: "",
                password: ""
            });
        } catch (err) {
            setError(
                err.response?.data?.mensaje ||
                "Ocurrió un error al registrar el usuario"
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen">

            <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full">

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido(a)</h1>

                    <small className="text-gray-400 block my-4 text-sm">Por favor ingresa tus datos</small>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>

                        {/* Campo nombre */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                            />
                        </div>

                        {/* Campo apellido */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Apellido</label>
                            <input
                                type="text"
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                placeholder="Ingresa tu apellido"
                                className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                            />
                        </div>

                        {/* Campo dirección */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={form.direccion}
                                onChange={handleChange}
                                placeholder="Ingresa tu dirección de domicilio"
                                className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                            />
                        </div>

                        {/* Campo celular */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Celular</label>
                            <input
                                type="text"
                                name="celular"
                                value={form.celular}
                                onChange={handleChange}
                                inputMode="tel"
                                placeholder="Ingresa tu celular"
                                className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                            />
                        </div>

                        {/* Campo correo electrónico */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                            <input
                                type="email"
                                name="correo"
                                value={form.correo}
                                onChange={handleChange}
                                placeholder="Ingresa tu correo electrónico"
                                className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Contraseña</label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="************"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Mensajes de respuesta */}
                        {mensaje && (
                            <p className="text-sm text-emerald-600 mt-3">
                                {mensaje}
                            </p>
                        )}

                        {error && (
                            <p className="text-sm text-red-600 mt-3">
                                {error}
                            </p>
                        )}

                        {/* Botón Register */}
                        <div className="mb-3">
                            <button
                                type="submit"
                                disabled={cargando}
                                className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white disabled:opacity-50"
                            >
                                {cargando ? "Registrando..." : "Registrarse"}
                            </button>
                        </div>

                    </form>

                    {/* Enlace para iniciar sesión si ya tiene una cuenta */}
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Ya posees una cuenta?</p>
                        <Link
                            to="/login"
                            className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900"
                        >
                            Iniciar sesión
                        </Link>
                    </div>

                </div>

            </div>

            {/* Imagen */}
            <div className="w-full sm:w-1/2 h-1/3 sm:h-screen bg-[url('/public/images/dogregister.jpg')] bg-no-repeat bg-cover bg-center sm:block hidden">
            </div>

        </div>
    );
};