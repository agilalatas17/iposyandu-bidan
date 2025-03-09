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

import { PELAYANAN_DATA } from '@/constants/ibu-bersalin';
import {
  YA_TIDAK_OPTIONS,
  MENYUSUI_DINI_OPTIONS,
} from '@/constants/select-options';

export default function PelayananCreatePage() {
  const [formTambahPelayanan] = Form.useForm();
  const [data, setData] = useState(PELAYANAN_DATA);
  const [countIdNumber, setCountIdNumber] = useState(data.length + 1);
  const [isLoading, setIsLoading] = useState(false);
  const { ibu_bersalin_id } = useParams();
  const router = useRouter();

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
      formTambahPelayanan.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/pelayanan`);
    } catch (err) {
      return message.error('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Pelayanan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-create-pelayanan"
            form={formTambahPelayanan}
            onFinish={onCreateData}
            layout="vertical"
          >
            <Row justify="space-between" gutter={[32, 40]}>
              <Col span={8}>
                <Form.Item
                  label="Menggunakan Partograf"
                  name="menggunakan_partograf"
                >
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Catat di Buku KIA" name="catat_di_buku_kia">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Inisiasi Menyusui Dini"
                  name="inisiasi_menyusui_dini"
                >
                  <Select options={MENYUSUI_DINI_OPTIONS} />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href={`/ibu-bersalin/${ibu_bersalin_id}/pelayanan`}
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
