import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import SideMenu from '@/components/SideMenu/SideMenu';
import HeaderApp from '@/components/HeaderApp/HeaderApp';

export default function DashboardLayout({ children }) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
      hasSider
    >
      <Sider theme="light" width={260}>
        <div className="pt-4 pb-6 text-center text-xl font-extrabold text-black">
          iPosyandu Bidan
        </div>
        <SideMenu />
      </Sider>
      <Layout>
        <HeaderApp />

        <Content className="py-4 px-6 bg-[#F2F5F7]" style={{ minHeight: 380 }}>
          <main>{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
}
