'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function SideMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const isPathname = window.location.href;
  const activeLink = '/' + isPathname.split('/').pop();

  const navItems = [
    {
      key: 'dashboard',
      label: (
        <Link
          href="/dashboard"
          className={`text-slate-500 hover:text-indigo-500 [&.active]:bg-indigo-100 [&.active]:text-indigo-600 ${
            pathname === activeLink ? 'active' : ''
          }`}
        >
          Dashboard
        </Link>
      ),
    },
    {
      key: 'ibu-hamil',
      label: (
        <Link
          href="/ibu-hamil"
          className={`text-slate-500 hover:text-indigo-500 [&.active]:bg-indigo-100 [&.active]:text-indigo-600 ${
            pathname === activeLink ? 'active' : ''
          }`}
        >
          Ibu Hamil
        </Link>
      ),
    },
    {
      key: 'bersalin',
      label: (
        <Link
          href="/ibu-bersalin"
          className={`text-slate-500 hover:text-indigo-500 [&.active]:bg-indigo-100 [&.active]:text-indigo-600 ${
            pathname === window.location.href ? 'active' : ''
          }`}
        >
          Ibu Bersalin
        </Link>
      ),
    },
    {
      key: 'nifas',
      label: (
        <Link
          href="/ibu-nifas"
          className={`${pathname === window.location.href}`}
        >
          Ibu Nifas
        </Link>
      ),
    },
  ];

  console.log('NAV LINK : ', navItems);
  console.log('PATH NAME : ', pathname);
  console.log('PATH NAME IS PATHNAME: ', pathname === pathname);
  console.log('ACTIVE LINK : ', activeLink);
  console.log('WINDOW HREF : ', window.location.href);
  console.log('WINDOW PATHNAME : ', window.location.pathname);

  return (
    <>
      <Menu items={navItems} />
    </>
  );
}

export default SideMenu;
