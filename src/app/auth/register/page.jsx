import { Space } from 'antd';
import Title from 'antd/es/typography/Title';
import FormRegister from '@/components/auth/FormRegister';

export default function RegisterPage() {
  return (
    <>
      <Space direction="vertical" className="w-full">
        <Title level={3} className="text-center">
          Registrasi
        </Title>
        <FormRegister />
      </Space>
    </>
  );
}
