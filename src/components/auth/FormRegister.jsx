'use client';

import { Form, Input, Button } from 'antd';
import {
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';

export default function FormRegister() {
  // REGEX
  let emailRegex = /^[a-zA-Z0-9._+]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  let phoneNumberRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

  return (
    <>
      <Form name="register" size="large">
        <FormItem
          name="nama"
          rules={[
            { required: true, message: 'Masukkan email!' },
            {
              pattern: emailRegex,
              message: 'email tidak valid',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nama" />
        </FormItem>

        <FormItem
          name="email"
          rules={[
            { required: true, message: 'Masukkan email!' },
            {
              pattern: emailRegex,
              message: 'email tidak valid',
            },
          ]}
        >
          <Input type="email" prefix={<MailOutlined />} placeholder="Email" />
        </FormItem>

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
            Daftar
          </Button>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="w-1/5 border-b md:w-1/4"></span>

          <p className="text-xs text-gray-500 uppercase">
            Sudah punya akun?{' '}
            <Link
              href="/auth/login"
              className="text-xs text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>

          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </Form>
    </>
  );
}
