<script>
  import { MenuItem } from "@deboxsoft/svelte-components";
</script>

<MenuItem linkClass="hover:underline" {...$$restProps}>
  <slot />
</MenuItem>
