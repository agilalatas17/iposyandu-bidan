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
  Select,
  Divider,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { useParams, useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

import { PROSES_PERSALINAN_DATA } from '@/constants/ibu-bersalin';
import {
  PRESENTASI_PERSALINAN_OPTIONS,
  CARA_PERSALINAN_OPTIONS,
  TEMPAT_PERSALINAN_OPTIONS,
  PENOLONG_PERSALINAN_OPTIONS,
} from '@/constants/select-options';

export default function ProsesPersalinanUpdatePage() {
  const router = useRouter();
  const [formUbahProsesPersalinan] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(PROSES_PERSALINAN_DATA);
  const { ibu_bersalin_id, proses_persalinan_id } = useParams();

  useEffect(() => {
    const prosesPersalinanData = data.find(
      (item) => item.id === parseInt(proses_persalinan_id)
    );

    if (prosesPersalinanData) {
      setData(prosesPersalinanData);

      formUbahProsesPersalinan.setFieldsValue({
        usia_kehamilan: prosesPersalinanData.usia_kehamilan,
        hpht: dayjs(prosesPersalinanData.hpht),
        taksiran_persalinan: dayjs(prosesPersalinanData.taksiran_persalinan),
        presentasi: prosesPersalinanData.presentasi,
        cara_persalinan: prosesPersalinanData.cara_persalinan,
        tempat: prosesPersalinanData.tempat,
        alamat: prosesPersalinanData.alamat,
        penolong: prosesPersalinanData.penolong,
      });
    }
  }, [proses_persalinan_id]);

  const onUpdateData = (values) => {
    try {
      setIsLoading(true);

      const updatedData = {
        ...data,
        ...values,
      };

      setData(updatedData);
      message.success('Berhasil mengubah data!');
      formUbahProsesPersalinan.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/proses-persalinan`);
    } catch (err) {
      return message.error('Gagal mengubah data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Ubah Data Proses Persalinan</Title>
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
            form={formUbahProsesPersalinan}
            onFinish={onUpdateData}
            layout="vertical"
          >
            <Row justify="space-between" gutter={[32, 40]}>
              <Col span={6}>
                <Form.Item
                  label="Usia Kehamilan (minggu)"
                  name="usia_kehamilan"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan usia kehamilan',
                    },
                  ]}
                >
                  <Input suffix="Minggu" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="HPHT"
                  name="hpht"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan hari pertama haid terakhir',
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

              <Col span={6}>
                <Form.Item
                  label="Taksiran Persalinan"
                  name="taksiran_persalinan"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan taksiran persalinan',
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

              <Col span={6}>
                <Form.Item label="Presentasi" name="presentasi">
                  <Select options={PRESENTASI_PERSALINAN_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Cara Persalinan" name="cara_persalinan">
                  <Select options={CARA_PERSALINAN_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Tempat" name="tempat">
                  <Select options={TEMPAT_PERSALINAN_OPTIONS} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Alamat Tempat Bersalin" name="alamat">
                  <TextArea
                    showCount
                    maxLength={150}
                    allowClear
                    style={{ height: 80, resize: 'none' }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Penolong" name="penolong">
                  <Select options={PENOLONG_PERSALINAN_OPTIONS} />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href={`/ibu-bersalin/${ibu_bersalin_id}/proses-persalinan`}
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
