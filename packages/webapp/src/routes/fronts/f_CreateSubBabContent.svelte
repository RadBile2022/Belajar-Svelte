   <!-- ASIDE -->
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
</aside>

<div class=" bg-slate-50 ml-64 min-h-screen p-10  ">
    <div class="flex justify-end">
        <a href="./g_Peview" class="bg-blue-400 px-3 py-2 text-xs rounded-3xl text-white">Preview Page</a>
    </div>

    <div class="block">
        <label class="block mb-2 font-semibold">Nama Sub Bab</label>
        <input type="text" class="w-6/12 border rounded font-normal text-sm px-1 py-1 
        border-blue-400 hover:border-blue-600 focus:border-2 focus:ring-blue-600 focus:outline-none">
    </div>

    <div class="block mt-10 ">
        <label class="font-semibold">Konten</label>

        <div class="p-2 border rounded-sm border-slate-300 flex justify-between">
            <div class="w-6/12 ">
                <label > bold</label>
            </div>
            <div class="w-6/12 ">
                <label >preview</label>
            </div>
        </div>
        <div class=" flex justify-between m-0.5">
            <div class="flex flex-grow w-6/12  ">
                <textarea class="min-w-full border-2 rounded font-normal text-sm px-1 py-1 
                border-blue-400 hover:border-blue-800 focus:border-2 focus:ring-blue-600 focus:outline-none" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="flex w-6/12">
                <textarea class="min-w-full border-2 rounded font-normal text-sm px-1 py-1 
                border-blue-400 hover:border-blue-800 focus:border-2 focus:ring-blue-600 focus:outline-none" name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
    </div>

    <div class=" mt-10 flex justify-between">
        <a href="" class="border bg-slate-100 border-slate-300 px-2  rounded-lg hover:bg-red-500 hover:text-white hover:rounded-lg hover:duration-700 hover:px-3 hover:py-1 hover:border-none">Delete</a>
        
        <div class="">
            <a href="" class="bg-blue-500 border border-blue-500 text-white px-4 py-1 rounded-md">Save</a>
            <a href="" class="bg-slate-200 border border-slate-300 px-3 py-1 rounded-lg">Cancel</a>
        </div>

    </div>
</div>