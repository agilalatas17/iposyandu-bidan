'use client';

import { Form, Input, Button } from 'antd';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';

export default function FormRegister() {
  // REGEX
  let phoneNumberRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

  return (
    <>
      <Form name="register" size="large">
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
          <Input prefix={<PhoneOutlined />} placeholder=" No. Telepon" />
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
            placeholder=" Password"
          />
        </FormItem>
      </Form>
    </>
  );
}
