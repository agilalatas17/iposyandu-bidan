'use client';

import { useState } from 'react';
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

export default function KeadaanCreatePage() {
  const [formTambahKeadaan] = Form.useForm();
  const [data, setData] = useState(KEADAAN_DATA);
  const [countIdNumber, setCountIdNumber] = useState(data.length + 1);
  const [isLoading, setIsLoading] = useState(false);
  const { ibu_bersalin_id } = useParams();
  const router = useRouter();

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

  const onCreateData = (values) => {
    try {
      setIsLoading(true);

      const payload = {
        id: countIdNumber,
        ...values,
      };

      setData(data.push(payload));
      setCountIdNumber(countIdNumber + 1);

      message.success('Berhasil menambahkan data!');
      formTambahKeadaan.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/keadaan`);
    } catch (err) {
      return message.error('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Keadaan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '50%' }}
          loading={isLoading}
        >
          <Form
            name="form-create-keadaan"
            form={formTambahKeadaan}
            onFinish={onCreateData}
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
