'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, message } from 'antd';
import {
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import Link from 'next/link';
import { registerUser } from '@/libs/api/auth';

export default function FormRegister() {
  const [formRegisterUser] = Form.useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // REGEX
  let emailRegex = /^[a-zA-Z0-9._+]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  let phoneNumberRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

  const onRegister = async (values) => {
    setIsLoading(true);

    try {
      const body = {
        nama: values.nama,
        email: values.email,
        noTelp: values.noTelp,
        password: values.password,
      };
      const res = await registerUser(body);

      if (res.status === 409) {
        return message.open({
          type: 'error',
          content: res.message,
        });
      }

      message.success('Pendaftaran berhasil!');
      formRegisterUser.resetFields();
      router.push('/auth/login');
    } catch (err) {
      return message.open({
        type: 'error',
        content: err.message || 'Terjadi kesalahan!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        name="form-register"
        form={formRegisterUser}
        onFinish={onRegister}
        size="large"
      >
        <FormItem
          name="nama"
          rules={[
            { required: true, message: 'Masukkan nama!' },
            { min: 3, message: 'Nama minimal 3 huruf>' },
            {
              whitespace: true,
              message: 'Nama tidak boleh diawali dengan spasi>',
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
              message: 'Email tidak valid>',
            },
            {
              whitespace: true,
              message: 'Email tidak boleh diawali dengan spasi>',
            },
          ]}
        >
          <Input type="email" prefix={<MailOutlined />} placeholder="Email" />
        </FormItem>

        <FormItem
          name="noTelp"
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
            {
              min: 8,
              message: 'Minimal 8 karakter',
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
            loading={isLoading}
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
