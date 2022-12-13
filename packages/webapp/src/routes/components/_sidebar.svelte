<script>
    import { each } from "svelte/internal";

    export let data = [
        {
            title: "Bab 1 Mengenal Java",
            subtopic: [
                {
                    label: "Sign Up Oracle",
                    link: "/subtopic/signup-oracle",
                },
                {
                    label: "Download JDK",
                    link: "/subtopic/download-jdk",
                },
                {},
            ]
        },
        {
            title :"Bab 2 Data",
            subtopic:[
                {
                    label : "Variable",
                    link:"/subtopic/variable"
                },
                {
                    label : "Type Data",
                    link :"/subtopic/type-data"
                }
            ]
        }
    ];


</script>


<aside class=" w-64 h-full fixed overflow-y-scroll">
    <div class="m-7">
        <ul>
            {#each data as item}
                <li>
                    <h5 class="font-semibold text-slate-900 mb-3">
                        {item.title}
                    </h5>
                    <ul
                        class="font-normal ml-4 text-slate-900 text-sm list-item">
                        {#each item.subtopic as subBab}
                            <li class="hover:text-cyan-500 duration-600 mb-3">
                                <a href={subBab.link}>{subBab.label}</a>
                            </li>
                        {/each}
                    </ul>
                </li>
            {/each}
        </ul>
    </div>
</aside>
