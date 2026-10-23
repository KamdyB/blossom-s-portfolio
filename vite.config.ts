import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This repository is published at username.github.io/repository-name/.
  base: '/blossom-s-portfolio/',
})
