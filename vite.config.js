import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgrPlugin from 'vite-plugin-svgr'
import react from "@vitejs/plugin-react";
import sassPlugin from 'vite-plugin-sass';
// see all documentation here https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build change as your need
 
  build: {
    outDir: 'build',
  },
  plugins: [
    sassPlugin(),
    react(),
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  server: {
    allowedHosts: [".localhost"],
    host: true,
  }
})

