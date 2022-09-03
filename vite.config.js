import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const root = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, _ }) => {
  let env = loadEnv(mode, root)
  console.log(`command: ${command}, mode: ${mode}`)
  console.log('env:', env, process.argv)
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve('src'),
        // '#': resolve('types'),
      },
    },
  }
})
