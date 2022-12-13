<script>

     
      //  import Navbar from "../components/_navbar.svelte";
      
      //  import Sidebar from "../components/_sidebar.svelte";
      //  import SidebarRight from "../components/_sidebarKanan.svelte"
  import { Page, Layout } from "$lib/layout/prime/index.ts";
  import { SidebarMenuItem } from "$lib/components/prime/index.ts";
</script>

<Layout>
  <Page>
    <svelte:fragment slot="sidebar-left">
      <SidebarMenuItem>Kursus</SidebarMenuItem>
    </svelte:fragment>
    <slot />
  </Page>
</Layout>



  
<!--   
  <Navbar/>
  <Sidebar/>
  <SidebarRight/> -->
  
  
  <!-- <a href="/">Home</a>
  <a href="/john">people</a>
  <slot /> -->