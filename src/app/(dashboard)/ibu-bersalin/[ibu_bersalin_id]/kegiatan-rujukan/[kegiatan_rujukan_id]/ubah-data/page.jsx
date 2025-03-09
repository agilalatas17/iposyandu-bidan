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
  Select,
  Divider,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { useRouter, useParams } from 'next/navigation';

import { KEGIATAN_RUJUKAN_DATA } from '@/constants/ibu-bersalin';
import { YA_TIDAK_OPTIONS, KEADAAN_OPTIONS } from '@/constants/select-options';

export default function KegiatanRujukanUpdatePage() {
  const router = useRouter();
  const [formUbahRujukan] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(KEGIATAN_RUJUKAN_DATA);
  const { ibu_bersalin_id, kegiatan_rujukan_id } = useParams();

  useEffect(() => {
    const kegiatanRujukanData = data.find(
      (item) => item.id === parseInt(kegiatan_rujukan_id)
    );

    if (kegiatanRujukanData) {
      setData(kegiatanRujukanData);

      formUbahRujukan.setFieldsValue({
        faskes_puskesmas: kegiatanRujukanData.faskes_puskesmas,
        faskes_rumah_bersalin: kegiatanRujukanData.faskes_rumah_bersalin,
        faskes_rsia: kegiatanRujukanData.faskes_rsia,
        faskes_rs: kegiatanRujukanData.faskes_rs,
        faskes_lain_lain: kegiatanRujukanData.faskes_lain_lain,
        keadaan_tiba: kegiatanRujukanData.keadaan_tiba,
        keadaan_pulang: kegiatanRujukanData.keadaan_pulang,
      });
    }
  }, [kegiatan_rujukan_id]);

  const onUpdateData = (values) => {
    try {
      setIsLoading(true);

      const updatedData = {
        ...data,
        ...values,
      };

      setData(updatedData);
      message.success('Berhasil mengubah data!');
      formUbahRujukan.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/kegiatan-rujukan`);
    } catch (err) {
      return message.error('Gagal mengubah data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Ubah Data Kegiatan Rujukan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-update-kegiatan-rujukan"
            form={formUbahRujukan}
            onFinish={onUpdateData}
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
