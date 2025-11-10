import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
 server:{
    proxy:{
      "/api":{
        target: "https://mern-blog-backend-yoak.onrender.com",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    tailwindcss(),
    react()],
})
