'use client';

import { useFormStatus } from 'react-dom';
import { Form, Input, Button } from 'antd';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import Link from 'next/link';

export default function FormLogin() {
  const { pending } = useFormStatus();

  // REGEX
  let phoneNumberRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;
  return (
    <Form name="login" size="large">
      <FormItem
        name="no_telp"
        rules={[
          { required: true, message: 'Masukkan nomer telepon!' },
          {
            pattern: phoneNumberRegex,
            message: 'Nomer telepon tidak valid',
          },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="No. Telepon" />
      </FormItem>

      <FormItem
        name="password"
        rules={[
          {
            required: true,
            message: 'Masukkan password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </FormItem>

      <div className="mt-8">
        <Button
          type="primary"
          htmlType="submit"
          className="w-full !font-semibold"
        >
          Masuk
        </Button>
      </div>

      <div className="flex items-center justify-between mt-6">
        <span className="w-1/5 border-b md:w-1/4"></span>

        <p className="text-xs text-gray-500 uppercase">
          atau{' '}
          <Link
            href="/auth/register"
            className="text-xs text-blue-600 hover:underline"
          >
            registrasi
          </Link>
        </p>

        <span className="w-1/5 border-b md:w-1/4"></span>
      </div>
    </Form>
  );
}
