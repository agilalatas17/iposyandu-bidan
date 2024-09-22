'use client';

import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    key: '1',
    label: <Link href="/">Dashboard</Link>,
  },
  {
    key: '2',
    label: <Link href="/ibu-hamil">Ibu Hamil</Link>,
  },
  {
    key: '3',
    label: <Link href="/ibu-bersalin">Ibu Bersalin</Link>,
  },
  {
    key: '4',
    label: <Link href="/ibu-nifas">Ibu Nifas</Link>,
  },
  {
    key: '5',
    label: <Link href="/keluarga-berencana">Keluarga Berencana</Link>,
  },
];

function SideMenu() {
  return (
    <>
      <Menu
        items={navItems}
        defaultSelectedKeys={['1']}
        style={{ maxHeight: '100vh' }}
      />
    </>
  );
}

export default SideMenu;
