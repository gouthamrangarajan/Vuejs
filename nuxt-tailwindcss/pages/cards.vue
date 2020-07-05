<template>
  <div class="flex flex-col lg:grid lg:grid-cols-3 space-y-6 lg:space-y-0 
            bg-white rounded py-6 px-12 m-auto overflow-x-hidden">
    <div class="flex flex-col">
        <label class="text-xl px-1">Basic without Image:</label>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">            
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div class="px-6 py-4">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
            </div>
        </div>
        <hr class="mt-4 md:w-5/6"/>
        <label class="text-xl px-1 mt-2">Basic with Action:</label>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">            
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <hr/>
            <div class="px-6 py-4 flex flex-row justify-around">
                <a class="text-lg text-blue-700 cursor-pointer">Action1</a>
                <span class="text-gray-300 text-4xl -mt-4">|</span>
                <a class="text-lg text-red-700 cursor-pointer">Action2</a>
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <label class="text-xl px-1">Basic with Image:</label>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div class="px-6 py-4">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
            </div>
        </div>
    </div>     
    <div class="flex flex-col">
        <label class="text-xl px-1">Image/Chart differentially aligned:</label>
        <div class="max-w-sm rounded shadow-lg mt-10">
            <div class="px-6 py-4">
                <img class="w-full -mt-12 rounded" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
            </div>
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div class="px-6 py-4">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
            </div>
        </div>
    </div>    
  </div>
</template>