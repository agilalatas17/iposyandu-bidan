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
  Divider,
  Select,
  message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useRouter, useParams } from 'next/navigation';

import { KEADAAN_DATA } from '@/constants/ibu-bersalin';

export default function KeadaanUpdatePage() {
  const router = useRouter();
  const [formUbahKeadaan] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(KEADAAN_DATA);
  const { ibu_bersalin_id, keadaan_id } = useParams();

  const keadaanOptions = [
    {
      label: 'Sehat',
      value: 'sehat',
    },
    {
      label: 'Sakit',
      value: 'sakit',
    },
  ];

  const statusOptions = [
    {
      label: 'Hidup',
      value: 'hidup',
    },
    {
      label: 'Meninggal',
      value: 'meninggal',
    },
  ];

  useEffect(() => {
    const keadaanData = data.find((item) => item.id === parseInt(keadaan_id));

    if (keadaanData) {
      setData(keadaanData);

      formUbahKeadaan.setFieldsValue({
        keadaan_ibu: keadaanData.keadaan_ibu,
        status_ibu: keadaanData.status_ibu,
        keadaan_bayi: keadaanData.keadaan_bayi,
        status_bayi: keadaanData.status_bayi,
      });
    }
  }, [keadaan_id]);

  const onUpdateData = (values) => {
    try {
      setIsLoading(true);

      const updatedData = {
        ...data,
        ...values,
      };

      setData(updatedData);
      message.success('Berhasil mengubah data!');
      formUbahKeadaan.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/keadaan`);
    } catch (err) {
      return message.error('Gagal mengubah data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Ubah Data Keadaan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '50%' }}
          loading={isLoading}
        >
          <Form
            name="form-update-keadaan"
            form={formUbahKeadaan}
            onFinish={onUpdateData}
            layout="vertical"
          >
            <Row justify="space-between" gutter={[24, 0]} wrap>
              <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
                Ibu
              </Title>

              <Col span={12}>
                <Form.Item label="Keadaan" name="keadaan_ibu">
                  <Select options={keadaanOptions} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Status" name="status_ibu">
                  <Select options={statusOptions} />
                </Form.Item>
              </Col>

              <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
                Bayi
              </Title>

              <Col span={12}>
                <Form.Item label="Keadaan" name="keadaan_bayi">
                  <Select options={keadaanOptions} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Status" name="status_bayi">
                  <Select options={statusOptions} />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href={`/ibu-bersalin/${ibu_bersalin_id}/keadaan`}
                  size="large"
                  danger
                >
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
