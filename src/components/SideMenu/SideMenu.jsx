'use client';

import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SideMenu() {
  const pathname = usePathname();

  const navItems = [
    {
      key: 'dashboard',
      label: (
        <Link
          href="/dashboard"
          className={`block w-[calc(100% - 8px)] rounded-e-full hover:!rounded-e-full m-1 px-4 hover:!text-primary/80 hover:font-medium ${
            pathname.startsWith('/dashboard')
              ? '!bg-primary !font-medium !text-white'
              : ''
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
          className={`block w-[calc(100% - 8px)] rounded-e-full hover:!rounded-e-full m-1 px-4 hover:!text-primary/80 hover:font-medium ${
            pathname.startsWith('/ibu-hamil')
              ? '!bg-primary !font-medium !text-white'
              : ''
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
          className={`block w-[calc(100% - 8px)] rounded-e-full hover:!rounded-e-full m-1 px-4 hover:!text-primary/80 hover:font-medium ${
            pathname.startsWith('/ibu-bersalin')
              ? '!bg-primary !font-medium !text-white'
              : ''
          }`}
        >
          Ibu Bersalin
        </Link>
      ),
    },
  ];

  return (
    <>
      <Menu
        defaultSelectedKeys={'1'}
        selectedKeys={[pathname]}
        items={navItems}
      />
    </>
  );
}

export default SideMenu;
