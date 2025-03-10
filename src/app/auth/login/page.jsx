import { Space } from 'antd';
import Title from 'antd/es/typography/Title';
import FormLogin from '@/components/auth/FormLogin';

export default function LoginPage() {
  return (
    <>
      <Space direction="vertical" className="w-full">
        <Title level={3} className="text-center">
          Login
        </Title>
        <FormLogin />
      </Space>
    </>
  );
}
