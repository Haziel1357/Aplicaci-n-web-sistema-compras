import { create } from "zustand";

const useAuthStore = create((set) => ({
  usuario: null,
  token: null,

  establecerSesion: (usuario, token) => {
    set({ usuario, token });
  },

  cerrarSesion: () => {
    set({
      usuario: null,
      token: null
    });
  }
}));

export default useAuthStore;
