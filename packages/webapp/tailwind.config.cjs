const config = require("@deboxsoft/svelte-core/libs/tailwind.config").primer;
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts,css}", "./node_modules/@deboxsoft/svelte-components/**/*.{svelte,css,js}", "./node_modules/@deboxsoft/svelte-themes/**/*.svelte"],
  safelist: [
    {pattern: /^(text-fg|bg-(canvas|neutral|accent|success|attention|severe|danger|open|closed|done)|border(-muted|-subtle)).*$/, variants: ["hover", "active", "disabled", "placeholder"]},
  ]
};
