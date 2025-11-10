import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
})
