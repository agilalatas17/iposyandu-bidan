import { Suspense } from 'react';
import { SessionProvider } from '@/components/SessionProvider';
import { ConfigProvider, App } from 'antd';
import { antdThemeConfig } from '@/libs/antd/antdThemeConfig';
import { antdMessageConfig } from '@/libs/antd/antdMessageConfig';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Poppins } from 'next/font/google';
import Loading from './loading';
import './globals.css';

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
      <body
        className={`${poppins.className} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ConfigProvider theme={antdThemeConfig} message={antdMessageConfig}>
            <App>
              <AntdRegistry>
                <Suspense fallback={<Loading />}>
                  <main className="bg-gray-100 h-screen">{children}</main>
                </Suspense>
              </AntdRegistry>
            </App>
          </ConfigProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
