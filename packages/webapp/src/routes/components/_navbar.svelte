<script>
    import { each } from "svelte/internal";

    export let data = [{

        pic : "https://lambdasolusi.co.id/images/logo.PNG",
        pt :"PT LSI",
        menu:[
            {
                    label: "Learning Path",
                    link: "/nic"
                },
                {
                    label: "Beasiswa",
                    link: "/nice"
                },
                {
                    label: "Profile",
                    link: "/nices"
                }]
        }
       
    ];  
</script>

<nav class=" sticky top-0 py-4 px-8 bg-white border border-b-slate-300 md:flex md:items-center md:justify-between text-slate-700">
    {#each data as item}
    <span class=" text-sm font-sans font-semibold cursor-pointer ">
        <img class="h-7 inline" src="{item.pic}" alt="">  {item.pt}   </span>
        

    <div class="text-sm font-sans font-semibold leading-6 ">
        <ul class=" md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500"
        >   
        {#each item.menu as menus }
            <li class="mx-4 my-6 md:my-0 hover:text-cyan-500 duration-500 ">
                <a href={menus.link} class="">{menus.label}</a>
            </li>
        {/each}
        </ul>
    </div>
    {/each}

</nav>


