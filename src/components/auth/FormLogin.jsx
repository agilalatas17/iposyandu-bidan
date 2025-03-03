'use client';

import { useState } from 'react';
import { setCookie } from '@/libs/cookies';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/libs/api/auth';
import { getUser } from '@/libs/api/users';
import dayjs from 'dayjs';

import { setAuthorizationHeaders } from '@/libs/axios';

export default function FormLogin() {
  const [formLoginUser] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // REGEX
  let phoneNumberRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

  const onLogin = async (values) => {
    setIsLoading(true);

    try {
      const { noTelp, password } = values;

      const res = await loginUser({ noTelp, password });

      if (res.status === 'error') {
        return message.open({
          type: 'error',
          content: res.message || 'Gagal login!',
        });
      }

      setAuthorizationHeaders(res.data.token);

      const detailUser = await getUser();
      if (detailUser) {
        localStorage.setItem(
          'iposyandubidan:access_token',
          JSON.stringify({ ...res.data, noTelp: noTelp })
        );

        const expired = dayjs().add(12, 'hour').toDate();

        await setCookie('iposyandubidan:_uuid', res.data.token, {
          httpOnly: true,
          expires: expired,
        });

        await setCookie('iposyandubidan:user', detailUser.data.nama, {
          httpOnly: true,
          expires: expired,
        });
      }

      message.open({
        type: 'success',
        content: 'Berhasil login!',
      });

      formLoginUser.resetFields();
      router.push('/dashboard');
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
    <Form
      name="form-login"
      form={formLoginUser}
      onFinish={onLogin}
      size="large"
    >
      <FormItem
        name="noTelp"
        rules={[
          { required: true, message: 'Masukkan nomer telepon!' },
          {
            pattern: phoneNumberRegex,
            message: 'Nomer telepon tidak valid.',
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
            message: 'Minimal 8 karakter.',
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
