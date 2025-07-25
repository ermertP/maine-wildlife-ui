// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: 'localhost',
//     port: 3000,
//   },
// });

import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// In codesandbox, we won't have the packages folder
// We ignore errors in this case
let aliases = [];
try {
  const packages = fs.readdirSync(path.resolve(__dirname, '../../packages'));
  aliases = packages.map((dirName) => {
    const packageJson = require(path.resolve(
      __dirname,
      '../../packages',
      dirName,
      'package.json'
    ));
    return {
      find: new RegExp(`^${packageJson.name}$`),
      replacement: path.resolve(
        __dirname,
        `../../packages/${packageJson.name}/src`
      ),
    };
  }, {});
} catch {}
/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */

export default {
  plugins: [react()],
  resolve: {
    alias: [
      ...aliases,
      {
        find: /^@mui\/icons-material\/(.*)/,
        replacement: '@mui/icons-material/esm/$1',
      },
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  define: {
    'process.env': {
      API_URL: process.env.API_URL,
    },
  },
};
