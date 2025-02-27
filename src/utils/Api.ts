import { baseUrl } from './baseUrl';

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }

  const data = await response.json();
  return data.token;
};

export const registerUser = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Error al registrar el usuario');
  }

  const data = await response.json();
  return data;
};

  export const logoutUser = async (token: string) => {
  const response = await fetch(`${baseUrl}/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }

  const data = await response.json();
  return data;
};
