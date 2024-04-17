import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 设置库名称
    lib: {
      entry: 'src/main.tsx', // 入口文件路径
      name: pkg.name, // 库名称
      // fileName: 'your-library-name', // 输出文件名称，不带后缀
    },
    // 设置库目标格式
    rollupOptions: {
      output: {
        format: 'umd', // umd 格式
        // 设置全局变量名称
        name: `${pkg.name}-[name]`,
        // 设置全局变量名称的挂载点
        // globals: {
        //   vue: 'Vue', // 如果你的库依赖了 Vue，则需要配置
        // },
      },
    },
  },
})
