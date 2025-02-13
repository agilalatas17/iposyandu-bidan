'use client';

import { useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    key: 'dashboard',
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: 'ibu-hamil',
    label: <Link href="/ibu-hamil">Ibu Hamil</Link>,
  },
  {
    key: 'bersalin',
    label: <Link href="/ibu-bersalin">Ibu Bersalin</Link>,
  },
  {
    key: 'nifas',
    label: <Link href="/ibu-nifas">Ibu Nifas</Link>,
  },
];

function SideMenu() {
  const pathname = usePathname();
  const [current, setCurrent] = useState();

  return (
    <>
      <Menu items={navItems} />
    </>
  );
}

export default SideMenu;
