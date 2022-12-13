<script>
    export let data =[{
        
    }];
</script>

<div class="bg-gray-200  min-h-screen flex flex-col">
    <div class="bg-slate-100 mx-auto w-96 rounded-xl mt-20 border border-slate-400">
        <div class = "mt-3 mx-3 relative p-2 font-semibold">
            <label class="block mb-3"> Nama Bab</label>
            <input class="pl-1 font-normal w-full mb-5 rounded
            border border-blue-400 hover:border-blue-600 focus:border-2 focus:ring-blue-600 focus:outline-none" type="text" name="" id="">
            <label class="block mb-3">Deskripsi</label> 
            <textarea class=" font-light pl-1 mb-5 w-full rounded border border-blue-400 focus:border-2 focus:ring-blue-600
            focus:outline-none hover:border-blue-600" name="" id="" cols="30" rows="7"></textarea>
        </div>

        <div class="flex justify-end mb-5 mr-5">
            <a href="#" class="bg-blue-500 px-5 py-1.5 text-white rounded">Save</a>
            <a href="#" class="bg-white px-3 py-1.5 ml-5 rounded border border-slate-400">Cancel</a>
        </div>
    </div>
</div>
