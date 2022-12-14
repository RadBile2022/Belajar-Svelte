<script>
  import { each } from "svelte/internal";

  export let data = [
    {
      judul: "Judul Buku",
      status: "Status",
      updateTime: "Waktu Terakhir Publikasi",
      createDate: "Tanggal Pembuatan",
      row: [
        {
          judul: "Java Fundamental",
          status: "Terpublikasi",
          updateTime: "21 Desember 2022",
          createDate: "10 Desember 2022"
        },
        {
          judul: "Java Advanced",
          status: "Belum Terpublikasi",
          updateTime: "-",
          createDate: "15 Desember 2022"
        },
        {}
      ]
    }
  ];
</script>

<div class="flex justify-center mt-10">
  <h5 class="font-semibold text-2xl ">Daftar Buku</h5>
</div>

<div class="flex justify-between mt-5 mb-5 mx-20">
  <div class="flex">
    <span class="">
      <input
        type="text"
        class="border rounded font-normal text-sm px-3 py-1 ml-10
                    border-blue-400 hover:border-blue-600 focus:border-2 focus:ring-blue-600 focus:outline-none"
        placeholder="Cari Buku"
      />
    </span>
  </div>

  <div class="flex">
    <a href="./b_popCreateBook" class="text-sm text-white bg-blue-700 px-4 py-3 rounded mr-10 font-normal"> Buat Buku </a>
  </div>
</div>

<ul class="border w-10/12 mx-auto text-justify ">
  {#each data as item}
    <!-- <li class="text-slate-700 bg-gray-200 border font-semibold text-sm  ">
      <tr>
        <th class="py-3 px-6">{item.judul}</th>
        <th class="py-3 px-6">{item.status}</th>
        <th class="py-3 px-6">{item.updateTime}</th>
        <th class="py-3 px-6">{item.createDate}</th>
      </tr>
    </thead> -->
    <li class="">
      {#each item.row as row}
        <ul class="hover:cursor-pointer  hover:bg-blue-100  py-3 px-6 border-b ">
          <li class=" text-lg font-semibold">{row.judul}</li>
          <div class="flex text-xs mt-5 text-slate-500">
            <p class=" mr-5 ">{row.status}</p>
            <p class="mr-16">{row.updateTime}</p>
            <p class="mr-5">Created Date</p>
            <p>{row.createDate}</p>
          </div>
        
        </ul>
      {/each}
      </li>
  {/each}
</ul>