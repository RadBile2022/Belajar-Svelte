<script>
    import { each } from "svelte/internal";
  
    export let data = [
      {
        judul: "Bab",
        qtySubBab: "Sub Bab",
        status: "Status",
        row: [
          {
            judul: "Encapsulation",
            qtySubBab: "2",
            status: "Terpublikasi"
          },
          {
            judul: "Inheritance",
            qtySubBab: "6",
            status: "Terpublikasi"
          },
          {
            judul: "Polymorphism",
            qtySubBab: "-",
            status: "-"
          }
        ]
      }
    ];
  </script>

<!-- ASIDE
  <aside class=" w-64 h-full fixed overflow-y-scroll">
    <div class="m-7">
        <ul>
            <li>
                <h5 class="font-semibold text-slate-900 mb-3">Bab 1 Java</h5>
                <ul class="font-normal ml-4 text-slate-900 text-sm list-item">
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Sign Up Oracle</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Download JDK</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Instalasi JDK</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Instalasi Netbeans</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Proyek Hello World</a>
                    </li>
                </ul>
            </li>

            <li>
                <h5 class="font-semibold text-slate-900 mb-3">Bab 2 Data</h5>
                <ul class="font-normal ml-4 text-slate-900 text-sm list-item">
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Variable</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Type Data</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Basic Input Output </a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Arithmetic Operation</a>
                    </li>

                </ul>
            </li>

            <li>
                <h5 class="font-semibold text-slate-900 mb-3">Bab 3 Control Flow </h5>
                <ul class="font-normal ml-4 text-slate-900 text-sm list-item">
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Statement</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Looping</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Exception Handling </a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">String Function</a>
                    </li>
                </ul>
            </li>

            <li>
                <h5 class="font-semibold text-slate-900 mb-3">Bab 4 Array </h5>
                <ul class="font-normal ml-4 text-slate-900 text-sm list-item">
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Array One Dimensions</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Array List</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Vector </a>
                    </li>
                </ul>
            </li>



            <li>
                <h5 class="font-semibold text-slate-900 mb-3">Bab 5 Functions </h5>
                <ul class="font-normal ml-4 text-slate-900 text-sm list-item">
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Parameter & Non Parameter</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Static & Non Static</a>
                    </li>
                    <li class="hover:text-cyan-500 duration-600 mb-3">
                        <a href="">Void & Return</a>
                    </li>
                </ul>
            </li>
        </ul>

    </div>
</aside> -->

<div class="ml-64 mr-0 min-h-screen">

  <!-- tombol atas -->
  <div class="p-10 flex  justify-between">
    <div class="">
      <label class="text-4xl">Java Dasar</label>
      <a href="" class=" text-white text-xs ml-2 bg-blue-400 py-1 px-2 rounded-md">edit</a>
    </div>
    <div class="text-sm pt-3">
      <a href="" class="text-white bg-green-500 rounded-lg px-3 py-3">Publikasi</a>
      <a href="" class="bg-gray-300 rounded-lg p-3">Batal Publikasi</a>
    </div>
  </div>

  <!-- tengah -->
  <div class="flex justify-between  mb-10 ">
    <div class="flex">
      <span class="">
        <input
          type="text"
          class="border rounded font-normal text-sm px-3 py-1 ml-10
                    border-blue-400 hover:border-blue-600 focus:border-2 focus:ring-blue-600 focus:outline-none"
          placeholder="Search Bab"
        />
      </span>
      <span class="" />
    </div>

    <div class="flex">
      <a href="./d_popCreateChapter" class="text-sm text-white bg-blue-700 px-4 py-3 rounded mr-10 font-normal"> Buat Bab </a>
    </div>
  </div>

  <!-- table -->
  <div class="px-10">
    <table class="border w-full mx-auto text-justify ">
        {#each data as item }
        <thead class="text-slate-700 bg-gray-200 border font-semibold text-sm  ">
        <tr>
          <th class="py-3 px-6">{item.judul}</th>
          <th>{item.qtySubBab}</th>
          <th>{item.status}</th>
        </tr>
      </thead>
      <tbody>
        {#each item.row as row }
         <tr class="hover:cursor-pointer font-normal hover:bg-blue-100 text-sm">
            <td class="py-3 px-6 ">{row.judul}</td>
            <td>{row.qtySubBab}</td>
            <td>{row.status}</td>
          </tr>
        {/each}
      </tbody>
        {/each}
     
    </table>
  </div>
</div>

