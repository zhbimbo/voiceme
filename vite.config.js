import { defineConfig } from 'vite';

function mockApiPlugin() {
  return {
    name: 'mock-telegram-api',
    configureServer(server) {
      server.middlewares.use('/api/telegram', (req, res, next) => {
        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          console.log('[demo] Заявка:', body);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({ ok: true, demo: true, message: 'Заявка принята (демо)' }));
        });
      });
    },
  };
}

export default defineConfig({
  root: '.',
  base: process.env.VITE_BASE || '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
  plugins: [mockApiPlugin()],
  server: {
    port: 5173,
    open: true,
  },
});
