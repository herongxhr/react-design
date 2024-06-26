import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // 开发环境配置
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      server: {
        open: true, // 自动打开浏览器
      },
    };
  } else {
    // 生产环境配置
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
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
