import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  // Optionnel : désactiver l'overlay d'erreur si nécessaire
  server: {
    hmr: {
      overlay: false,
    },
  },
})
