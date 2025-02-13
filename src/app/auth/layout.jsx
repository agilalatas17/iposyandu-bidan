import Image from 'next/image';
import { Flex, Space } from 'antd';
import Title from 'antd/es/typography/Title';

export default function AuthLayout({ children }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex justify-center items-center w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl min-h-[506px] h-[506px]">
        <div className="hidden bg-cover lg:block lg:w-1/2">
          <Image
            src="/assets/images/iPosyandu Bidan Logo.jpg"
            alt="Logo"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>

        <div className="flex justify-center items-center w-full px-6 py-8 md:px-8 lg:w-1/2 ">
          {children}
        </div>
      </div>
    </div>
  );
}
