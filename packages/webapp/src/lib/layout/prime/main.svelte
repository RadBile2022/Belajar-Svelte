<script>
  import { Navbar, NavbarItem } from "@deboxsoft/svelte-components";
</script>

<div class="bg-canvas flex h-screen w-screen flex-col overflow-auto">
  <Navbar>
    <NavbarItem slot="brand" item={{ show: true, type: "title" }}>
      <div class="text-fg-on-emphasis flex h-full items-center">LMS 1</div>
    </NavbarItem>
    <slot name="navbar-center" slot="center" />
    <slot name="navbar-right" slot="right" />
  </Navbar>
  <div class="bg-canvas-inset flex flex-1 flex-row">
    <slot />
  </div>
</div>
