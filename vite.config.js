import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { PrimeVueResolver } from "unplugin-vue-components/resolvers"
import mkcert from "vite-plugin-mkcert"

/* 
In dev mode, we want to be able to authenticate using ORCID. For this, we want this app to run as 
https://test.e-rihs.io:5137

Steps to make this work:
  1. Add the following line to /etc/hosts: 127.0.0.1 localhost test.e-rihs.io
  2. Install vite-plugin-mkcert: yarn add vite-plugin-mkcert -D
  3. Add the following lines to vite.config.js:
      - import mkcert from 'vite-plugin-mkcert' // at the top
      - https: true, // in the server object
      - mkcert() // in the plugins array
  4. Run the app with the host option: yarn dev --host

*/

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: true, // enable https
    },
    base: "/register-services/",
    plugins: [
        mkcert(), // create self-signed certificates
        vue(),
        Components({
            resolvers: [PrimeVueResolver()],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
