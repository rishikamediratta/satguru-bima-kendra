import path from 'path';
import { cartographer } from '@replit/vite-plugin-cartographer';
import { devBanner } from '@replit/vite-plugin-dev-banner';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const defaultPort = 5173;

function getLocalDevPort() {
  const rawPort = process.env.PORT;

  if (rawPort === undefined) {
    return defaultPort;
  }

  const port = Number(rawPort);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  return port;
}
const basePath = process.env.BASE_PATH ?? "/";
export default defineConfig(({ command, isPreview }) => ({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          cartographer({
            root: path.resolve(import.meta.dirname, '..'),
          }),
          devBanner(),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: command === 'serve' && !isPreview ? getLocalDevPort() : defaultPort,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port: defaultPort,
    host: '0.0.0.0',
    allowedHosts: true,
  },
}));
