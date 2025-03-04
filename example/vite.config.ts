import { defineConfig, mergeConfig } from "vite";
import baseConfig from "../vite.config.base";

export default defineConfig(
  mergeConfig(baseConfig, {
    plugins: [
      {
        name: "vite:raw",
        transform(code, id) {
          if (id.endsWith("?raw")) {
            return `export default ${JSON.stringify(code)}`;
          }
        }
      }
    ],
    server: {
      port: 3456,
      open: true
    }
  })
);
