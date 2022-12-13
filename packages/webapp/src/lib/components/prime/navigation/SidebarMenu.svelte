<script>
  import SidebarItem from "./SidebarItem.svelte";
  import { generateId } from "@deboxsoft/module-client";

  export let title = undefined;
  export let id = generateId({ prefix: "sidebar-menu-item-" });
</script>

<SidebarItem>
  {#if title}
    <div class="px-4 text-xs font-semibold" {id}>
      <span>{title}</span>
    </div>
  {/if}
  <ul aria-labelledby={id}>
    <slot />
  </ul>
</SidebarItem>
