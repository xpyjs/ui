/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import baseConfig from "./vite.config.base";

export default defineConfig(
  mergeConfig(baseConfig, {
    plugins: [
      dts({
        include: [
          "packages/**/*.ts",
          "packages/**/*.d.ts",
          "packages/**/*.vue"
        ],
        exclude: [
          "packages/**/__tests__/**",
          "packages/**/*.test.ts",
          "packages/**/*.spec.ts",
          "node_modules/**"
        ],
        outDir: "types"
      })
    ],
    build: {
      lib: {
        entry: resolve(__dirname, "packages/index.ts"),
        formats: ["es", "umd"],
        name: "XUI",
        fileName: format => `index.js`
      },
      cssCodeSplit: false, // 禁止CSS代码分割
      rollupOptions: {
        external: ["vue"],
        output: [
          {
            globals: { vue: "Vue" },
            format: "es",
            entryFileNames: "[name].js",
            assetFileNames: "index.css",
            preserveModules: true,
            dir: "es"
          },
          {
            globals: { vue: "Vue" },
            format: "cjs",
            entryFileNames: "[name].js",
            assetFileNames: "index.css",
            preserveModules: true,
            dir: "lib"
          }
        ]
      }
    },
    test: {
      // 启用类似 jest 的全局测试 API
      globals: true,
      // 模拟浏览器环境
      environment: "jsdom",
      // 支持 tsx 组件
      transformMode: {
        web: [/.[tj]sx$/]
      },
      // 设置测试环境文件
      setupFiles: ["./test/setup.ts", "./test/utils.ts"],
      // 测试覆盖率
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        include: [
          "packages/components/**/*.{ts,vue}",
          "packages/directives/**/*.ts",
          "packages/utils/**/*.ts"
        ],
        exclude: [
          "packages/**/*.test.ts",
          "packages/**/__tests__/**",
          "packages/**/*.d.ts",
          "packages/**/types/**"
        ]
      },
      include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      exclude: ["node_modules", "dist", ".idea", ".git", ".cache"]
    }
  })
);
