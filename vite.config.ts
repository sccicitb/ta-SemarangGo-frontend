// @ts-nocheck
import { defineConfig, loadEnv } from "vite";
import lessToJS from "less-vars-to-js";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import Inspect from "vite-plugin-inspect";
import { resolve } from "path";
import fs from "fs";
import path from "path";
import postcssModulesValues from "postcss-modules-values";

const themeVariables = lessToJS(
  fs.readFileSync(resolve("./src/variables/theme-variable.less"), "utf8")
);

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [
      Inspect(),
      react(),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: name => {
              if (name === "col" || name === "row") {
                return "antd/lib/style/index.less";
              }
              return `antd/es/${name}/style/index.less`;
            }
          }
        ]
      })
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src")
        }
      ]
    },
    css: {
      modules: {
        localsConvention: 'dashes',
      },
      postcss: {
        plugins: [
          postcssModulesValues
        ],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: themeVariables
        }
      }
    },
    server: {
      port: process.env.VITE_PORT
    }
  });
}