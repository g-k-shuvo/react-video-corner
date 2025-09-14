import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'library') {
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          include: ['src/components/VideoCorner/**/*'],
          outDir: 'dist',
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/components/VideoCorner/index.ts'),
          name: 'ReactVideoCorner',
          formats: ['es', 'umd'],
          fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        sourcemap: true,
        emptyOutDir: true,
      },
      optimizeDeps: {
        exclude: ['lucide-react'],
      },
    };
  }

  // Development mode
  return {
    plugins: [react()],
    server: {
      port: 5175,
      strictPort: true,
      host: true,
      open: true
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
