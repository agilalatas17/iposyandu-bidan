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
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { useRouter, useParams } from 'next/navigation';

import { MANAJEMEN_AKTIF_KALA_TIGA_DATA } from '@/constants/ibu-bersalin';
import { YA_TIDAK_OPTIONS } from '@/constants/select-options';

export default function ManajemenAktifKalaTigaCreatePage() {
  const [formTambahManajemenKalaTiga] = Form.useForm();
  const [data, setData] = useState(MANAJEMEN_AKTIF_KALA_TIGA_DATA);
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
      formTambahManajemenKalaTiga.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/manajemen-aktif-kala-tiga`);
    } catch (err) {
      return message.error('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>
          Tambah Data Manajemen Aktif Kala III Ibu Bersalin
        </Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-create-manajemen-aktif-kala-tiga"
            form={formTambahManajemenKalaTiga}
            onFinish={onCreateData}
            layout="vertical"
          >
            <Row gutter={[32, 40]}>
              <Col span={8}>
                <Form.Item label="Injeksi Oksitosin" name="injeksi_oksitosin">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Peregangan Tali Pusat"
                  name="peregangan_tali_pusat"
                >
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Masase Fundus Uteri"
                  name="masase_fundus_uteri"
                >
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href={`/ibu-bersalin/${ibu_bersalin_id}/manajemen-aktif-kala-tiga`}
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
