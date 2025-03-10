'use client';

import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Space,
  Flex,
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Divider,
  message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

import { IBU_BERSALIN_DATA } from '@/constants/ibu-bersalin';

export default function IbuBersalinCreatePage() {
  const [formTambahIbuBersalin] = Form.useForm();
  const [data, setData] = useState(IBU_BERSALIN_DATA);
  const [countIdNumber, setCountIdNumber] = useState(data.length + 1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onCreateData = (values) => {
    try {
      setIsLoading(true);

      const payload = {
        id: countIdNumber,
        tgl_daftar: values.tgl_daftar,
        ...values,
      };

      console.log('CEK PAYLOAD : ', payload);

      data.push(payload);
      // setData(payload);
      setCountIdNumber(countIdNumber + 1);

      message.success('Data berhadil ditambahkan!');

      formTambahIbuBersalin.resetFields();
      router.push('/ibu-bersalin');
    } catch (err) {
      return message.error('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>
      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-ibu-bersalin"
            form={formTambahIbuBersalin}
            onFinish={onCreateData}
            layout="vertical"
          >
            <Flex justify="space-between" wrap gap={24}>
              <Col span={7}>
                <Form.Item
                  label="Tanggal Daftar"
                  name="tgl_daftar"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan tanggal daftar',
                    },
                  ]}
                >
                  <DatePicker
                    className="!w-full"
                    format="DD MMMM YYYY"
                    placeholder=""
                  />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  label="Ibu Hamil"
                  name="ibu_hamil"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan nama ibu hamil',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="No Register Kohort" name="no_register_kohort">
                  <Input />
                </Form.Item>
              </Col>
            </Flex>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button type="default" href="/ibu-bersalin" size="large" danger>
                  Batal
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isLoading}
                >
                  Simpan
                </Button>
              </Space>
            </Flex>
          </Form>
        </Card>
      </Row>
    </>
  );
}
