'use client';
import { Header } from 'antd/es/layout/layout';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space, Flex } from 'antd';

const items = [
  {
    label: <a href="#">Logout</a>,
    icon: <LogoutOutlined />,
    key: '0',
  },
];

function HeaderApp() {
  return (
    <>
      <Header className="!bg-white">
        <Flex justify="end">
          <Dropdown
            arrow={true}
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <h3 className="font-medium text-black mr-2">Bd. Juneni</h3>
                <Avatar
                  className="!bg-green-600"
                  size={36}
                  icon={<UserOutlined />}
                />
              </Space>
            </a>
          </Dropdown>
        </Flex>
      </Header>
    </>
  );
}

export default HeaderApp;
