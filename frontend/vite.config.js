import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build:{
  //   watch:{

  //   }
  // }
  server:{
    host:true,
    proxy: {
      '/api': {
        target: `${process.env.VITE_PRODUCTION === 'remote' ? '':'http://localhost:3000'}`,
      },
    },
  }
})
