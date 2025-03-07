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
  Select,
  Divider,
  message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useRouter, useParams } from 'next/navigation';

import { INTEGRASI_PROGRAM_DATA } from '@/constants/ibu-bersalin';

export default function IntegrasiProgramCreatePage() {
  const [formTambahIntegrasiProgram] = Form.useForm();
  const [data, setData] = useState(INTEGRASI_PROGRAM_DATA);
  const [countIdNumber, setCountIdNumber] = useState(data.length + 1);
  const [isLoading, setIsLoading] = useState(false);
  const { ibu_bersalin_id } = useParams();
  const router = useRouter();

  const profilaksisOptions = [
    {
      label: 'ZDV',
      value: 'ZDV',
    },
    {
      label: 'NVP',
      value: 'NVP',
    },
    {
      label: '3TC',
      value: '3TC',
    },
  ];

  const malariaOptions = [
    {
      label: 'ART',
      value: 'ART',
    },
    {
      label: 'AMO',
      value: 'AMO',
    },
    {
      label: 'Kin',
      value: 'Kin',
    },
  ];

  const tuberkulosisOptions = [
    {
      label: 'R',
      value: 'R',
    },
    {
      label: 'H',
      value: 'H',
    },
    {
      label: 'Z',
      value: 'Z',
    },
    {
      label: 'E',
      value: 'E',
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
      formTambahIntegrasiProgram.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/integrasi-program`);
    } catch (err) {
      return message.error('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Integrasi Program</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-create-integrasi-program"
            form={formTambahIntegrasiProgram}
            onFinish={onCreateData}
            layout="vertical"
          >
            <Row justify="space-between" gutter={[32, 40]}>
              <Col span={8}>
                <Form.Item label="ARV Profilaksis" name="arv_profilaksis">
                  <Select options={profilaksisOptions} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Obat Anti Malaria" name="obat_anti_malaria">
                  <Select options={malariaOptions} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Obat Anti Tb" name="obat_anti_tb">
                  <Select options={tuberkulosisOptions} />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href="/integrasi-program"
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
