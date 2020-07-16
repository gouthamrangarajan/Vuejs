<template>
    <div class="flex flex-col bg-white shadow rounded py-6 px-12 md:w-2/3 lg:w-3/5 m-auto overflow-x-hidden">
        <label class="text-xl px-1">Colored:</label>
        <div class="flex flex-col space-y-1 lg:space-y-0 lg:space-x-1  lg:flex-row">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
             <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
             <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
            <button class="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
            <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
            <button class="bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
             <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded ">
                Button
            </button>
        </div>
        <hr class="mt-2"/>
        <label class="text-xl px-1 mt-4">Pill:</label>
        <div class="flex flex-col space-y-1 lg:space-y-0 lg:space-x-1 lg:flex-row">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
             <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
             <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
            <button class="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
            <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
            <button class="bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
             <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full ">
                Button
            </button>
        </div>
        <hr class="mt-2"/>
        <label class="text-xl px-1 mt-4">Outline:</label>
        <div class="flex flex-col space-y-1 lg:space-y-0 lg:space-x-1 lg:flex-row">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 
                    border border-blue-500 hover:border-transparent rounded ">
                Button
            </button>
            <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 
                    border border-red-500 hover:border-transparent rounded ">
                Button
            </button>
            <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 
                    border border-green-500 hover:border-transparent rounded ">
                Button
            </button>
              <button class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 
                    border border-indigo-500 hover:border-transparent rounded ">
                Button
            </button>
              <button class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 
                    border border-teal-500 hover:border-transparent rounded ">
                Button
            </button>
              <button class="bg-transparent hover:bg-gray-700 text-gray-900 font-semibold hover:text-white py-2 px-4 
                    border border-gray-700 hover:border-transparent rounded ">
                Button
            </button>
              <button class="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 
                    border border-indigo-500 hover:border-transparent rounded ">
                Button
            </button>
              <button class="bg-transparent hover:bg-yellow-700 text-yellow-900 font-semibold hover:text-white py-2 px-4 
                    border border-yellow-700 hover:border-transparent rounded ">
                Button
            </button>
              <button class="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 
                    border border-pink-500 hover:border-transparent rounded ">
                Button
            </button>
        </div>
        <hr class="mt-2"/>
        <label class="text-xl px-1 mt-4">Disabled:</label>
        <div class="flex flex-col space-y-1 lg:space-y-0 lg:space-x-1 lg:flex-row">
            <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                Button
             </button>
             <button class="bg-red-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                Button
             </button>
            <button class="bg-green-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                Button
             </button>
        </div>
         <hr class="mt-2"/>
         <label class="text-xl px-1 mt-4">Raised:</label>
         <div class="flex flex-col space-y-1 lg:space-y-0 lg:space-x-1 lg:flex-row">
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Button
            </button>           
        </div>
        <hr class="mt-2"/>
        <label class="text-xl px-1 mt-4">Groups:</label>
        <div class="inline-flex">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                Prev
            </button>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                Next
            </button>
        </div>
    </div>
</template>