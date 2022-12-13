<script>
  import { Sidebar } from "@deboxsoft/svelte-components";
  import { getUIContext, getLayoutContext } from "@deboxsoft/svelte-core";
  import { SidebarMenu } from "$lib/components/prime/index.ts";
</script>

<div class="flex flex-1 grid-cols-12 flex-row">
  {#if $$slots["sidebar-left"]}
    <div class="relative hidden h-full flex-shrink-0 md:flex">
      <Sidebar
        class="sticky top-0 left-0 bottom-0 flex w-[var(--sidebar-width)] flex-col"
        themeClass="border-[var(--sidebar-color-border)] text-[var(--sidebar-color-content)] bg-[var(--sidebar-color-bg)] border-r p-2"
      >
        <SidebarMenu title="Kursus Saya">
          <slot name="sidebar-left" />
        </SidebarMenu>
      </Sidebar>
    </div>
  {/if}
  <div class="flex flex-1 flex-col md:col-span-9 md:px-4 lg:col-span-10 xl:px-8">
    <!--    page header-->
    <div>
      <slot name="page-header" />
    </div>
    <!--    page body-->
    <div>
      <slot />
    </div>
  </div>
</div>
