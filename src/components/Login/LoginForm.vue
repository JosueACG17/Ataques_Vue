  <template>
    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
      <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div class="mx-auto max-w-lg text-center">
          <h1 class="text-2xl font-bold sm:text-3xl">¡BIENVENIDO!</h1>
          <h2 class="text-lg text-gray-500 font-semibold mt-2">Inicia sesión con tu cuenta</h2>
        </div>
        <form @submit.prevent="handleSubmitLogin" class="mx-auto mt-8 mb-0 max-w-md space-y-4" novalidate>
          <div>
            <label for="email" class="text-gray-700">Correo Electrónico:</label>
            <div class="relative">
              <input
                type="email"
                v-model="email"
                v-bind="emailAttrs"
                :class="{ 'w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-medium': true, 'border-red-500': errors.email }"
                placeholder="Ingresa tu correo electrónico"
                required
              />
              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
            </div>
            <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
          </div>
          <div>
      <label for="password" class="text-gray-700">Contraseña:</label>
      <div class="relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          v-bind="passwordAttrs"
          :class="{ 'w-full rounded-lg border-2 p-4 pe-12 text-sm shadow-xs': true, 'border-red-500': errors.password }"
          placeholder="Ingresa tu contraseña"
          required
        />
        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg v-if="!showPassword" @click="togglePasswordVisibility" xmlns="http://www.w3.org/2000/svg" class="size-4 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else @click="togglePasswordVisibility" xmlns="http://www.w3.org/2000/svg" class="size-4 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.03 0 2.02.15 2.96.425M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 12a9.5 9.5 0 01-15 7.5M3 3l18 18" />
          </svg>
        </span>
      </div>
      <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
    </div>
          <button type="submit" class="inline-block w-full rounded-lg cursor-pointer bg-blue-800 px-5 py-3 text-sm font-medium text-white">
            Iniciar Sesión
          </button>
          <div class="mt-4 text-center">
            <span class="text-sm text-gray-500">¿No tienes cuenta aún? </span>
            <RouterLink to="/register" class="text-blue-600">Registrarse</RouterLink>
          </div>
        </form>
      </div>
      <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img alt="Fondo tecnológico"
          src="https://img.freepik.com/foto-gratis/conexiones-red-digital-3d-fondo-moderno_1048-10641.jpg?t=st=1740663594~exp=1740667194~hmac=c09cebbf0ecc06b3178bdbbff6e5d5063dade0bb8de93fc571169ef04560e656&w=1380"
          class="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </div>
    </section>
  </template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useStorage } from '@vueuse/core';
import { loginUser } from '@/utils/Api.ts';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const validationSchema = yup.object({
  email: yup.string()
    .trim()
    .email('Correo incorrecto')
    .required('El correo es requerido')
    .matches(/^[a-zA-Z0-9@.]+$/, 'El correo no debe contener caracteres especiales'),
  password: yup.string()
    .trim()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida')
    .matches(/^[a-zA-Z0-9]+$/, 'La contraseña no debe contener caracteres especiales'),
});

const { errors, defineField, handleSubmit } = useForm({
  validationSchema,
});

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: true,
});

const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: true,
});

const showPassword = ref(false);
const router = useRouter();
const token = useStorage('token', '');

const handleSubmitLogin = handleSubmit(async (values) => {
  try {
    const userToken = await loginUser(values.email, values.password);
    token.value = userToken;

    await Swal.fire({
      icon: 'success',
      title: '¡Inicio de sesión exitoso!',
      text: 'Has iniciado sesión correctamente.',
      showConfirmButton: false,
        timer: 1000,
    });

    router.push('/');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Credenciales incorrectas. Inténtalo de nuevo.',
      confirmButtonText: 'Aceptar',
    });
  }
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
