'use client';

import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { createIbuHamil } from '@/libs/api/ibuHamil';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.locale('id');

const { Option } = Select;

export default function CreateIbuHamilPage() {
  const [formTambahIbuHamil] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();

  const onHphtChange = (date) => {
    if (date) {
      const taksiranPersalinan = dayjs(date).add(280, 'days');
      formTambahIbuHamil.setFieldsValue({
        taksiranPersalinanDate: taksiranPersalinan,
      });
    }
  };

  const onCreateData = async (values) => {
    try {
      setIsLoading(true);

      const data = {
        tanggalDaftar: values.tanggalDaftar,
        nik: values.nik,
        nama: values.nama,
        hpht: values.hpht,
        tempatLahir: values.tempatLahir,
        tanggalLahir: values.tanggalLahir,
        pendidikanTerakhir: values.pendidikanTerakhir,
        pekerjaan: values.pekerjaan,
        alamat: values.alamat,
        telepon: values.telepon,
        golDarah: values.golDarah,
        pembiayaan: values.pembiayaan,
        noJkn: values.noJkn,
        faskes: values.faskes,
        faskesRujukan: values.faskesRujukan,
      };

      const response = await createIbuHamil(data);

      if (response.status === 409) {
        return message.open({
          type: 'error',
          content: 'NIK sudah Tersedia',
        });
      }

      message.success('Data ibu Hamil berhasil dibuat!');
      formTambahIbuHamil.resetFields();
      router.push('/ibu-hamil');
      setIsLoading(false);
    } catch (err) {
      message.open({
        type: 'error',
        content: 'Gagal menambahkan data!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </Row>
      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-ibu-hamil"
            form={formTambahIbuHamil}
            onFinish={onCreateData}
            layout="vertical"
          >
            <Flex justify="space-between" wrap gap={24}>
              <Col span={5}>
                <Form.Item
                  label="Tanggal Daftar"
                  name="tanggalDaftar"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan tanggal daftar',
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

              <Col span={5}>
                <Form.Item
                  label="NIK"
                  name="nik"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan NIK',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Nama"
                  name="nama"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan nama',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="Hari Pertama Haid Terakhir" name="hpht">
                  <DatePicker
                    className="!w-full"
                    format="DD MMMM YYYY"
                    onChange={onHphtChange}
                    placeholder=""
                    rules={[
                      {
                        required: true,
                        message: 'Masukkan hari pertama haid terakhir',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Taksiran Persalinan"
                  name="taksiranPersalinanDate"
                >
                  <DatePicker
                    className="!w-full"
                    format="DD MMMM YYYY"
                    placeholder=""
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Tempat Lahir"
                  name="tempatLahir"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan tempat lahir',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Tanggal Lahir"
                  name="tanggalLahir"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan tanggal Lahir',
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

              <Col span={5}>
                <Form.Item
                  label="Pendidikan Terakhir"
                  name="pendidikanTerakhir"
                >
                  <Select placeholder="">
                    <Option value="SD">SD</Option>
                    <Option value="SMP">SMP</Option>
                    <Option value="SMA">SMA</Option>
                    <Option value="D3">D3</Option>
                    <Option value="S1">S1</Option>
                    <Option value="S2">S2</Option>
                    <Option value="S3">S3</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="Pekerjaan" name="pekerjaan">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Alamat"
                  name="alamat"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan alamat',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="No Telepon"
                  name="telepon"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan nomor telepon',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="Golongan Darah" name="golDarah">
                  <Select placeholder="">
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="AB">AB</Option>
                    <Option value="O">O</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Pembiayaan"
                  name="pembiayaan"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan pembiayaan',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="No JKN"
                  name="noJkn"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan nomor JKN',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="Fasilitas Kesehatan" name="faskes">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Fasilitas Kesehatan Rujukan"
                  name="faskesRujukan"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Flex>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button type="default" href="/ibu-hamil" size="large" danger>
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
