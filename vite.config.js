import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
};

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 👈 bind to all interfaces so LAN devices can access
    port: 5173,
     strictPort: true,
    proxy: {
      '/submit': 'http://localhost:3013',
    },
  },
});