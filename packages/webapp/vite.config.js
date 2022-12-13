import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import nesting from "tailwindcss/nesting";
import tailwindCss from "tailwindcss";
import postCssImport from "postcss-import";
import routify from "@roxi/routify/vite-plugin";
import { defineConfig } from "vite";
import { mdsvex } from "mdsvex";
import path from "path";
import { createConfig } from "@deboxsoft/module-core/libs/config";
import { VitePluginFonts } from "vite-plugin-fonts";
import dotEnv from "dotenv";

export default defineConfig(({ mode }) => {
  const production = mode === "production";
  return {
    clearScreen: false,
    assetsInclude: ["./resources", "./fonts"],
    resolve: {
      extensions: [".js", ".svelte", ".ts", ".cts", ".mts"],
      alias: {
        $assets: path.resolve("src/assets"),
        $lib: path.resolve("src/lib"),
        $components: path.resolve("src/components"),
        $utils: path.resolve("src/utils"),
        $modules: path.resolve("src/modules")
      },
      dedupe: ["svelte", "@deboxsoft/module-core"]
    },
    optimizeDeps: {
      exclude: ["path", "url", "fs", "@roxi/routify"]
    },
    plugins: [
      routify({
        routesDir: {
          default: "src/routes"
        },
        ssr: {
          enable: false
        },
        plugins: [
          {
            name: "serverApiConfig",
            before: "metaFromFile",
            build: () => {},
            metaContext: (context) => {
              const env = dotEnv.config().parsed;
              const config = createConfig({ home: env.APP_HOME, key: "app" });
              context.serverApiOpts = config.get("server-api");
              return context;
            }
          }
        ]
      }),
      VitePluginFonts({
        custom: {
          prefetch: true,
          preload: false,
          families: {
            Virgil: "./resources/fonts/FG_Virgil*",
            Inter: "./resources/fonts/Inter/Inter*"
          }
        }
      }),
      svelte({
        emitCss: false,
        compilerOptions: {
          hydratable: true,
          dev: !production
        },
        extensions: [".md", ".svelte"],
        preprocess: [
          mdsvex({ extension: "md" }),
          sveltePreprocess({
            postcss: true,
            typescript: true
          })
        ]
      })
    ],
    server: { port: 3001 }
  };
});
