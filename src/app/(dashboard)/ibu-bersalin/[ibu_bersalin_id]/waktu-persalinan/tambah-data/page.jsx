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
  DatePicker,
  Divider,
  TimePicker,
  message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useRouter, useParams } from 'next/navigation';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';
dayjs.extend(localizedFormat);
dayjs.locale('id');

import { WAKTU_PERSALINAN_DATA } from '@/constants/ibu-bersalin';

export default function WaktuPersalinanCreatePage() {
  const [formTambahWaktuPersalinan] = Form.useForm();
  const [data, setData] = useState(WAKTU_PERSALINAN_DATA);
  const [countIdNumber, setCountIdNumber] = useState(data.length + 1);
  const [isLoading, setIsLoading] = useState(false);
  const { ibu_bersalin_id } = useParams();
  const router = useRouter();

  const onCreateData = (values) => {
    try {
      setIsLoading(true);

      const payload = {
        id: countIdNumber,
        kala_i_aktif_jam: dayjs(values.kala_i_aktif_jam).format('HH:mm'),
        kala_ii_jam: dayjs(values.kala_ii_jam).format('HH:mm'),
        bayi_lahir_jam: dayjs(values.bayi_lahir_jam).format('HH:mm'),
        plasenta_lahir_jam: dayjs(values.plasenta_lahir_jam).format('HH:mm'),
        ...values,
      };

      setData(data.push(payload));
      setCountIdNumber(countIdNumber + 1);

      message.success('Berhasil menambahkan data!');
      formTambahWaktuPersalinan.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/waktu-persalinan`);
    } catch (err) {
      return message.error('Gagal menambahkan data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Waktu Persalinan</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="max-w-[50%]">
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-waktu-persalinan"
            form={formTambahWaktuPersalinan}
            onFinish={onCreateData}
            layout="vertical"
          >
            <Row justify="space-between" gutter={[24, 0]} wrap>
              <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
                Kala I Aktif
              </Title>

              <Col span={16}>
                <Form.Item label="Tanggal" name="kala_i_aktif_tanggal">
                  <DatePicker
                    className="!w-full"
                    format="DD MMMM YYYY"
                    placeholder=""
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Jam" name="kala_i_aktif_jam">
                  <TimePicker
                    className="!w-full"
                    format="HH:mm"
                    placeholder=""
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between" gutter={[24, 0]} wrap>
              <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
                Kala II
              </Title>

              <Col span={16}>
                <Form.Item label="Tanggal" name="kala_ii_tanggal">
                  <DatePicker
                    className="!w-full"
                    format="DD MMMM YYYY"
                    placeholder=""
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Jam" name="kala_ii_jam">
                  <TimePicker
                    className="!w-full"
                    format="HH:mm"
                    placeholder=""
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between" gutter={[24, 0]} wrap>
              <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
                Bayi Lahir
              </Title>

              <Col span={16}>
                <Form.Item label="Tanggal" name="bayi_lahir_tanggal">
                  <DatePicker
                    className="!w-full"
                    format="DD MMMM YYYY"
                    placeholder=""
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Jam" name="bayi_lahir_jam">
                  <TimePicker
                    className="!w-full"
                    format="HH:mm"
                    placeholder=""
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-between" gutter={[24, 0]} wrap>
              <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
                Plasenta Lahir
              </Title>

              <Col span={16}>
                <Form.Item label="Tanggal" name="plasenta_lahir_tanggal">
                  <DatePicker
                    className="!w-full"
                    format="DD MMMM YYYY"
                    placeholder=""
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Jam" name="plasenta_lahir_jam">
                  <TimePicker
                    className="!w-full"
                    format="HH:mm"
                    placeholder=""
                  />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href={`/ibu-bersalin/${ibu_bersalin_id}/waktu-persalinan`}
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
