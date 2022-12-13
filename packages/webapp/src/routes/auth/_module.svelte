<script>
  import { Card } from "@deboxsoft/svelte-components";

  export let title = "Login";
</script>

<div class="bg-canvas-inset flex h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
  <div class="relative flex flex-col sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="text-fg text-center text-3xl font-extrabold">{title}</h2>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <Card class="bg-canvas py-8 px-4 shadow sm:rounded-lg sm:px-10" themeClass="bg-canvas text-fg text-sm">
      <slot />
    </Card>
  </div>
</div>
