/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@images': path.resolve(__dirname, './src/assets'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@icons': path.resolve(__dirname, './src/assets/icons'),
            '@svgs': path.resolve(__dirname, './src/assets/svgs'),
            '@constants': path.resolve(__dirname, './src/utils/constants'),
            '@router': path.resolve(__dirname, './src/router'),
        },
    },
})
