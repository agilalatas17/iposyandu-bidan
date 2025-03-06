'use client';

import React, { useState, useEffect } from 'react';
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
  message,
  Divider,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useParams, useRouter } from 'next/navigation';
import { IBU_BERSALIN_DATA } from '@/constants/ibu-bersalin/ibuBersalinData';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

export default function IbuBersalinUpdatePage() {
  const router = useRouter();
  const [formUbahIbuBersalin] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const { ibu_bersalin_id } = useParams();

  useEffect(() => {
    const bersalinData = IBU_BERSALIN_DATA.find(
      (item) => item.id === parseInt(ibu_bersalin_id)
    );
    if (bersalinData) {
      setData(bersalinData); // Simpan data yang ditemukan
      formUbahIbuBersalin.setFieldsValue({
        tgl_daftar: dayjs(bersalinData.tgl_daftar), // Format tanggal
        ibu_hamil: bersalinData.ibu_hamil,
        no_register_kohort: bersalinData.no_register_kohort,
      });
    }
  }, [ibu_bersalin_id]);

  const onUpdateData = (values) => {
    try {
      setIsLoading(true);

      const updatedData = {
        ...data,
        ...values,
        tgl_daftar: values.tgl_daftar.format('YYYY-MM-DD'), // Format tanggal
      };

      setData(updatedData);
      message.success('Berhasil mengubah data!');
      formUbahIbuBersalin.resetFields();
      router.push('/ibu-bersalin');
    } catch (err) {
      return message.error('Gagal mengubah data!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Ubah Data Ibu Bersalin</Title>
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
            form={formUbahIbuBersalin}
            onFinish={onUpdateData}
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
                <Button type="default" href="/ibu-hamil" size="large" danger>
                  Batal
                </Button>
                <Button type="primary" htmlType="submit" size="large">
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
