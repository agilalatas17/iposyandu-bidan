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

import { KEGIATAN_RUJUKAN_DATA } from '@/constants/ibu-bersalin';
import { YA_TIDAK_OPTIONS, KEADAAN_OPTIONS } from '@/constants/select-options';

export default function KegiatanRujukanCreatePage() {
  const [formTambahRujukan] = Form.useForm();
  const [data, setData] = useState(KEGIATAN_RUJUKAN_DATA);
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
      formTambahRujukan.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/kegiatan-rujukan`);
    } catch (err) {
      return message.error('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Kegiatan Rujukan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-create-kegiatan-rujukan"
            form={formTambahRujukan}
            onFinish={onCreateData}
            layout="vertical"
          >
            <Row gutter={[32, 40]}>
              <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
                Faskes
              </Title>

              <Col span={8}>
                <Form.Item label="Puskesmas" name="faskes_puskesmas">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Rumah Bersalin" name="faskes_rumah_bersalin">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="RSIA / RSIB" name="faskes_rsia">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="RS" name="faskes_rs">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Lain-lain" name="faskes_lain_lain">
                  <TextArea maxLength={150} showCount />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[32, 40]}>
              <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
                Keadaan
              </Title>

              <Col span={8}>
                <Form.Item label="Tiba" name="keadaan_tiba">
                  <Select options={KEADAAN_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Pulang" name="keadaan_pulang">
                  <Select options={KEADAAN_OPTIONS} />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href={`/ibu-bersalin/${ibu_bersalin_id}/kegiatan-rujukan`}
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
