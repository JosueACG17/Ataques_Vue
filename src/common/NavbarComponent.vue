<template>
  <nav class="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://docente.utcancun.edu.mx/images/logos/utcbis-logo.png" class="h-8" alt="Logo">
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Josue Chan</span>
      </div>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          class="text-white bg-blue-800 hover:bg-blue-600 cursor-pointer font-medium rounded-lg text-sm px-4 py-2 text-center"
          @click="handleLogout"
        >
          Cerrar Sesión
        </button>
        <button @click="toggleMenu" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      <div :class="{ 'hidden': !isMenuOpen, 'block': isMenuOpen }"
        class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link to="/" class="block py-2 px-3 rounded-sm"
              :class="{ 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500': isActive('/') }"
              aria-current="page">Home</router-link>
          </li>
          <li>
            <router-link to="/" class="block py-2 px-3 rounded-sm text-white"
              :class="{ 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500': isActive('/about') }">About</router-link>
          </li>
          <li>
            <router-link to="/" class="block py-2 px-3 rounded-sm text-white"
              :class="{ 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500': isActive('/services') }">Services</router-link>
          </li>
          <li>
            <router-link to="/" class="block py-2 px-3 rounded-sm text-white"
              :class="{ 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500': isActive('/contact') }">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import Swal from 'sweetalert2';
import { logoutUser } from '@/utils/api';

const isMenuOpen = ref(false);
const route = useRoute();
const router = useRouter();
const token = useStorage('token', '');

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const isActive = (path: string) => {
  return route.path === path;
};

const handleLogout = async () => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    try {
      await logoutUser(token.value);
      token.value = '';
      await Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión correctamente.',
        showConfirmButton: false,
        timer: 1000,
      });

      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cerrar sesión. Inténtalo de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  }
};
</script>
