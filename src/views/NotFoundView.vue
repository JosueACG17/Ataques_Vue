<template>
  <div class="h-screen w-screen bg-gray-50 flex items-center text-center sm:text-start">
    <div class="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
      <div class="w-full lg:w-1/2 mx-10">
        <div class="text-8xl text-gray-700 font-dark font-extrabold "> 404</div>
        <p class="text-2xl md:text-3xl font-semibold leading-normal mb-8">
          Lo siento, te haz perdido brozazo
        </p>

        <RouterLink to="/"
          class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-gray-700 active:bg-red-600 hover:bg-red-700">
          Regresar</RouterLink>
      </div>
      <div class="w-full lg:flex lg:justify-end lg:w-1/2  my-12">
        <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
          class="" alt="Page not found">
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>
<style scoped></style>
