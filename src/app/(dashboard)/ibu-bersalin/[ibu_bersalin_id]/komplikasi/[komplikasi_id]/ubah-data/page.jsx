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

import { KOMPLIKASI_DATA } from '@/constants/ibu-bersalin';
import { YA_TIDAK_OPTIONS } from '@/constants/select-options';

export default function KomplikasiCreatePage() {
  const router = useRouter();
  const [formUbahKomplikasi] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(KOMPLIKASI_DATA);
  const { ibu_bersalin_id, komplikasi_id } = useParams();

  useEffect(() => {
    const komplikasiData = KOMPLIKASI_DATA.find(
      (item) => item.id === parseInt(komplikasi_id)
    );

    console.log('CEK PELAYANAN DATA ID : ', komplikasiData);

    if (komplikasiData) {
      setData(komplikasiData);
      formUbahKomplikasi.setFieldsValue({
        obesitas: komplikasiData.obesitas,
        hdk: komplikasiData.hdk,
        ppp: komplikasiData.ppp,
        infeksi: komplikasiData.infeksi,
        lain_lain: komplikasiData.lain_lain,
      });
    }
  }, [komplikasi_id]);

  const onUpdateData = (values) => {
    try {
      setIsLoading(true);

      const updatedData = {
        ...data,
        ...values,
      };

      setData(updatedData);
      message.success('Berhasil mengubah data!');
      formUbahKomplikasi.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/komplikasi`);
    } catch (err) {
      return message.error('Gagal mengubah data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Ubah Data Komplikasi Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-update-komplikasi"
            form={formUbahKomplikasi}
            onFinish={onUpdateData}
            layout="vertical"
          >
            <Row gutter={[32, 40]}>
              <Col span={8}>
                <Form.Item label="Obesitas" name="obesitas">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="HDK" name="hdk">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="PPP" name="ppp">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Infeksi" name="infeksi">
                  <Select options={YA_TIDAK_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Lain-lain" name="lain_lain">
                  <TextArea maxLength={150} showCount />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href={`/ibu-bersalin/${ibu_bersalin_id}/komplikasi`}
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
