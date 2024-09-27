import { axiosInstance } from '../axios/axios';

const baseUrl = process.env.NEXT_PUBLIC_URL_API;

export const getIbuHamil = async (id) => {
  const resource = id ? `${baseUrl}/ibu-hamil/${id}` : `${baseUrl}/ibu-hamil`;
  const res = await fetch(resource);
  const ibuHamil = await res.json();

  return ibuHamil.data;
};

export const createIbuHamil = async (body) => {
  try {
    const res = await fetch(`${baseUrl}/ibu-hamil`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const ibuHamil = await res.json();

    return ibuHamil;
  } catch (err) {
    return err.message;
  }
};

export const updateIbuHamil = async (body) => {
  try {
    const res = await fetch(`${baseUrl}/ibu-hamil`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const ibuHamil = res.json();
    return ibuHamil;
  } catch (err) {
    return err.message;
  }
};

export const deleteIbuHamil = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/ibu-hamil/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const ibuHamil = res.json();
    return ibuHamil;
  } catch (err) {
    return err.message;
  }
};
