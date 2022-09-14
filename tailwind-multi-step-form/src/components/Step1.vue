<template>
  <div class="flex flex-col space-y-2">
    <div class="flex flex-col space-y-1 mb-2">
      <span class="text-xl font-semibold text-blue-700">Welcome...</span>
      <span class="text-base">Please fill the following details</span>
    </div>
    <div class="flex flex-col space-y-1">
      <label class="text-gray-700">First Name</label>
      <input
        type="text"
        class="appearance-none outline-none py-2 px-4 transition duration-300 border border-indigo-300 focus:ring-1 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50 shadow shadow-purple-300 rounded"
      />
    </div>
    <div class="flex flex-col space-y-1">
      <label class="text-gray-700">Last Name</label>
      <input
        type="text"
        class="appearance-none outline-none py-2 px-4 transition duration-300 border border-indigo-300 focus:ring-1 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50 shadow shadow-purple-300 rounded"
      />
    </div>
  </div>
</template>
