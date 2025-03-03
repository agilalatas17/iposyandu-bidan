'use server';
import { cookies } from 'next/headers';
import dayjs from 'dayjs';

export const setCookie = async (name, value, option = {}) => {
  const cookieStore = await cookies();
  const cookieExpires = dayjs().add(12, 'hour').toDate();

  cookieStore.set(name, value, {
    ...option,
    httpOnly: option.httpOnly || true,
    expires: option.expires || cookieExpires,
  });
};

export const getCookie = async (name) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  return cookie;
};

export const hasCookie = async (name) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.has(name);

  return cookie;
};

export const destroyCookie = (name) => {
  const cookieStore = cookies();
  const cookie = cookieStore.delete(name);

  return cookie;
};
