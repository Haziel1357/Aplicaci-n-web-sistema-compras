import useAuthStore from "../store/authStore";
import { iniciarSesion } from "../services/authService";

const useAuth = () => {
  const usuario = useAuthStore((state) => state.usuario);
  const token = useAuthStore((state) => state.token);

  const establecerSesion = useAuthStore(
    (state) => state.establecerSesion
  );

  const cerrarSesion = useAuthStore(
    (state) => state.cerrarSesion
  );

  const login = async (correo, password) => {
    const respuesta = await iniciarSesion({
      correo,
      password
    });

    establecerSesion(
      respuesta.usuario,
      respuesta.token
    );

    return respuesta;
  };

  return {
    usuario,
    token,
    autenticado: Boolean(token),
    login,
    logout: cerrarSesion
  };
};

export default useAuth;
