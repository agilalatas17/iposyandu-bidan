'use server';
import { cookies } from 'next/headers';

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
