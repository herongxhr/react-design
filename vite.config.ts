import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ command }) => {
  const sharedConfig = {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
  if (command === 'serve') {
    return {
      ...sharedConfig,
      server: {
        open: true,
      },
    };
  } else {
    return {
      ...sharedConfig,
      build: {
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: [
            {
              format: 'cjs', // CommonJS
              entryFileNames: 'react-design.cjs.js',
            },
            {
              format: 'es', // ES Module
              entryFileNames: 'react-design.esm.js',
            },
            {
              format: 'umd', // UMD
              name: 'MyComponentLibrary',
              entryFileNames: 'react-design.umd.js',
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          ],
        },
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'react-design',
          formats: ['es', 'cjs', 'umd'],
          fileName: (format) => `react-design.${format}.js`,
        },
      },
    };
  }
});
