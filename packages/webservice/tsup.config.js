import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  clean: true,
  onSuccess: "nodemon --watch dist dist/index.js"
});
