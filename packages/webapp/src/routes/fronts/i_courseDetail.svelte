<script>
    import { each } from "svelte/internal";
  
    export let data = [
      {
        judul: "Belajar Membuat Aplikasi Android untuk Pemula",
        kategori: "Category : Teknologi Android",
        learningPath : "Learning Path : Android Developer", 
        prerequisite: "Prerequisite : Belajar Kotlin",
        tags : "tags : -",
        kompetensi : "Kompetensi : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique recusandae accusamus reiciendis atque architecto veniam cupiditate. Repellendus qui delectus numquam.",
        introVideo : "https://www.youtube.com/embed/6eC73bM63yQ?feature=oembed"
      }
    ];
  </script>



<div class="p-16  ">
    <div class="flex  ml-32 mr-40 ">
        {#each data as item}
            
        <div class="">
        
            <h1 class="text-xl font-semibold">{item.judul}</h1>
            <div class="flex mt-5 mb-2">
                    <!-- category -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g fill="none"><rect width="36" height="14" x="6" y="28" stroke="#000" stroke-width="4" rx="4"/><path stroke="#000" stroke-linecap="round" stroke-width="4" d="M20 7H10C7.79086 7 6 8.79086 6 11V17C6 19.2091 7.79086 21 10 21H20"/><circle cx="34" cy="14" r="8" fill="#2F88FF" stroke="#000" stroke-width="4"/><circle cx="34" cy="14" r="3" fill="#fff"/></g></svg>
                <p class="text-sm mr-16">{item.kategori}</p>
                    <!-- learning path -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M6 17q-.425 0-.713-.288Q5 16.425 5 16v-5.025q0-.425.287-.7Q5.575 10 6 10t.713.287Q7 10.575 7 11v5.025q0 .425-.287.7Q6.425 17 6 17Zm6 0q-.425 0-.712-.288Q11 16.425 11 16v-5.025q0-.425.288-.7Q11.575 10 12 10t.713.287Q13 10.575 13 11v5.025q0 .425-.287.7Q12.425 17 12 17Zm-9.025 4q-.425 0-.7-.288Q2 20.425 2 20t.288-.712Q2.575 19 3 19h18.025q.425 0 .7.288q.275.287.275.712t-.288.712Q21.425 21 21 21ZM18 17q-.425 0-.712-.288Q17 16.425 17 16v-5.025q0-.425.288-.7Q17.575 10 18 10t.712.287Q19 10.575 19 11v5.025q0 .425-.288.7Q18.425 17 18 17ZM12.9 1.45l8.425 4.2q.325.175.5.487q.175.313.175.688q0 .5-.362.837q-.363.338-.863.338H3.25q-.5 0-.875-.338Q2 7.325 2 6.825q0-.35.163-.675q.162-.325.512-.475L11.1 1.45q.425-.2.9-.2q.475 0 .9.2Z"/></svg>
                    <p class="text-sm ">{item.learningPath}</p>

            </div>
            
            <div class="flex">
       <!-- prerequisite -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18 10.5H6V22.5L12.0968 20.004L18 22.5V10.5Z" fill="#2563EB"></path> <path d="M12 1.5L15.915 3.71902L19.7942 6L19.83 10.5L19.7942 15L15.915 17.281L12 19.5L8.085 17.281L4.20577 15L4.17 10.5L4.20577 6L8.085 3.71902L12 1.5Z" fill="#3B82F6"></path> <path d="M12 3L15.2625 4.84918L18.4952 6.75L18.525 10.5L18.4952 14.25L15.2625 16.1508L12 18L8.7375 16.1508L5.50481 14.25L5.475 10.5L5.50481 6.75L8.7375 4.84918L12 3Z" fill="#60A5FA"></path> <path d="M12 6L13.4548 8.49768L16.2798 9.10942L14.3539 11.2648L14.645 14.1406L12 12.975L9.35497 14.1406L9.64614 11.2648L7.72025 9.10942L10.5452 8.49768L12 6Z" fill="#BFDBFE"></path> </svg>

                <p class="text-sm mr-16">
                    
                    
                    {item.prerequisite}</p>
                    <!-- tags -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18 10.5H6V22.5L12.0968 20.004L18 22.5V10.5Z" fill="#2563EB"></path> <path d="M12 1.5L15.915 3.71902L19.7942 6L19.83 10.5L19.7942 15L15.915 17.281L12 19.5L8.085 17.281L4.20577 15L4.17 10.5L4.20577 6L8.085 3.71902L12 1.5Z" fill="#3B82F6"></path> <path d="M12 3L15.2625 4.84918L18.4952 6.75L18.525 10.5L18.4952 14.25L15.2625 16.1508L12 18L8.7375 16.1508L5.50481 14.25L5.475 10.5L5.50481 6.75L8.7375 4.84918L12 3Z" fill="#60A5FA"></path> <path d="M12 6L13.4548 8.49768L16.2798 9.10942L14.3539 11.2648L14.645 14.1406L12 12.975L9.35497 14.1406L9.64614 11.2648L7.72025 9.10942L10.5452 8.49768L12 6Z" fill="#BFDBFE"></path> </svg>

                <p class="text-sm font-light">{item.tags}</p>
            </div>

            <p class="text-sm my-5 font-light">{item.kompetensi}</p>
            <div  class="flex justify-center">
                <iframe  width="400" height="300"
                src={item.introVideo} frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="" class="justify-center rounded"></iframe>
            </div>
          

        </div>
        <div class=" ">
            <div class="bg-slate-50 hover:bg-slate-200 border w-36 rounded px-3 py-2 border-black">
                <a href="">Sekarang Belajar</a>
                

            </div>
        </div>
       
        {/each}
    </div>
  
</div>