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
  Input,
  DatePicker,
  Select,
  Divider,
  message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { useRouter, useParams } from 'next/navigation';

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

export default function ProsesPersalinanCreatePage() {
  const [formTambahProsesPersalinan] = Form.useForm();
  const [data, setData] = useState(PROSES_PERSALINAN_DATA);
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
      formTambahProsesPersalinan.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/proses-persalinan`);
    } catch (err) {
      return message.error('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Proses Persalinan</Title>
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
            form={formTambahProsesPersalinan}
            onFinish={onCreateData}
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
