import { ConfigProvider, App } from 'antd';
import { antdThemeConfig } from '@/libs/antd/antdThemeConfig';
import { antdMessageConfig } from '@/libs/antd/antdMessageConfig';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Poppins } from 'next/font/google';
import './globals.css';

import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import SideMenu from '@/components/SideMenu/SideMenu';
import HeaderApp from '@/components/HeaderApp/HeaderApp';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'iPosyandu Bidan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.className} antialiased`}>
        <ConfigProvider theme={antdThemeConfig} message={antdMessageConfig}>
          <App>
            <AntdRegistry>
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
                  <Content
                    className="py-4 px-6 bg-[#F2F5F7]"
                    style={{ minHeight: 380 }}
                  >
                    <div>{children}</div>
                  </Content>
                </Layout>
              </Layout>
            </AntdRegistry>
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}
