'use client';

import { useState, useEffect } from 'react';
import { getCookie } from '@/libs/cookies';
import { Header } from 'antd/es/layout/layout';
import {
  LogoutOutlined,
  UserOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Space, Flex, message } from 'antd';
import { useRouter } from 'next/navigation';
import { refreshTokenUser, logoutUser } from '@/libs/api/auth';
import Title from 'antd/es/typography/Title';
function HeaderApp() {
  const { push } = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cookie = await getCookie('iposyandubidan:user');
        console.log('USER COOKIE : ', cookie);
        if (cookie) {
          setUser(cookie.value);
        }
      } catch (err) {
        return err.message;
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const onLogout = async () => {
    try {
      const res = await logoutUser();

      if (res.status !== 'success') {
        return message.open({
          type: 'error',
          content: 'Logout gagal!',
        });
      }

      push('/auth/login');
    } catch (err) {
      return message.open({
        type: 'error',
        content: 'Terjadi kesalahan!',
      });
    }
  };

  const items = [
    {
      label: <button onClick={onLogout}>Logout</button>,
      icon: <LogoutOutlined />,
      key: 1,
    },
  ];

  return (
    <>
      <Header className="!bg-white">
        <Flex justify="end">
          <Dropdown
            arrow={true}
            menu={{
              items,
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <a
              className="hover:!text-gray-800"
              onClick={(e) => e.preventDefault()}
            >
              {isLoading ? (
                <Space>
                  <div className="h-2.5 bg-gray-200 rounded-full w-32 "></div>
                  <svg
                    className="w-10 h-10 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>

                  <CaretDownOutlined
                    style={{ color: '#e5e7eb', margin: 0, padding: 0 }}
                  />
                </Space>
              ) : (
                <Space>
                  <Title
                    level={5}
                    className="font-medium capitalize text-black !m-0"
                  >
                    {isLoading ? `...` : `Bd. ${user}`}
                  </Title>
                  <Avatar
                    className="!bg-green-600"
                    size={36}
                    icon={<UserOutlined />}
                  />
                  <CaretDownOutlined style={{ color: '#000' }} />
                </Space>
              )}
            </a>
          </Dropdown>
        </Flex>
      </Header>
    </>
  );
}

export default HeaderApp;
