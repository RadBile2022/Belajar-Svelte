<script>

    export let data = [
        {
            title : "Pengantar Java",
            subtopic : [
                {
                    label : "Definisi",
                    link : "/subtopic/definisi"
                },
                {
                    label : "Perkembangan Java",
                    link : "/subtopic/perkembangan-java" 
                },
                {
                    label : "Sejarah Java",
                    link : "/subtopic/sejarah-java"
                },
                {
                    label : "Dukungan Java",
                    link : "/subtopic/dukungan-java"
                }
            ]

    }];
    
</script>

<div class=" bg-white fixed z-10 top-[4rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[18rem] overflow-y-auto list-item xl:block" >
    <div class=" text-sm text-black font-normal  decoration-slice p-6 list-item antialiased" >
        <ul>
            {#each  data as item }
                <li class=" ml-6 ">
                <h5 class=" font-semibold text-slate-900 mb-3"> {item.title} </h5>
                
                {#each item.subtopic as subBab }
                <ul class=" font-normal text-sm text-slate-900 list-item antialiased ml-4" >
                    <li class="mb-3 hover:text-cyan-500 duration-500">
                        <a href={subBab.link}>{subBab.label}</a> 
                    </li>
                </ul>
                {/each}
               
            </li>
            {/each}
        </ul>
        
    </div>
</div>