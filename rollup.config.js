import commonjs from "@rollup/plugin-commonjs";
import html from "rollup-plugin-html2";
import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import preprocess from 'svelte-preprocess';

const isDev = process.env.NODE_ENV === "development";
const port = 3000;

// define all our plugins
const plugins = [
  svelte({
    dev: isDev,
    extensions: [".svelte"],
    preprocess: preprocess()
  }),
  typescript(),
  resolve({
    browser: true,
    dedupe: ["svelte"]
  }),
  commonjs(),
  // injects your bundles into index page
  html({
    template: "src/index.html",
    fileName: "index.html"
  })
];

if (isDev) {
  plugins.push(
    // like a webpack-dev-server
    serve({
      contentBase: "./dist",
      historyApiFallback: true, // for SPAs
      port
    }),
    livereload({ watch: "./dist" })
  );
} else {
  plugins.push(terser({ sourcemap: isDev }));
}

module.exports = {
  input: "src/main.ts",
  output: {
    name: "bundle",
    file: "dist/bundle.js",
    sourcemap: isDev,
    format: "iife"
  },
  plugins
};
