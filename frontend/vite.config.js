/* eslint-disable */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.render.com/deploy/srv-cp74au021fec73dfkvn0?key=aT70WxMlXTc',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
