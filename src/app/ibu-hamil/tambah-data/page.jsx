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
  Select,
  message,
} from 'antd';
import dayjs from 'dayjs';
import FormItem from 'antd/es/form/FormItem';
import { createIbuHamil, getIbuHamil } from '@/libs/api/ibuHamil';
const { Option } = Select;

export default function Page() {
  const [formIbuHamil] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [taksiranPersalinan, setTaksiranPersalinan] = useState(null);

  const onHphtChange = (date) => {
    if (date) {
      const calculatedDate = dayjs(date).add(280, 'days');
      formIbuHamil.setFieldsValue({
        taksiranPersalinanDate: calculatedDate,
      });
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    console.log('Changed values:', changedValues);
    console.log('All values:', allValues);
    setFormData(allValues); // Simpan semua nilai ke state
  };

  // useEffect(() => {
  //   const newIbuHamil = fetch(`${baseUrl}/ibu-hamil`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(YOUR_DATA_THAT_YOU_WANT_TO_POST),
  //   });
  // }, []);

  const onCreateData = async (values) => {
    try {
      const data = {
        tanggalDaftar: dayjs(values.tanggalDaftar),
        nik: values.nik,
        nama: values.nama,
        hpht: dayjs(values.hpht),
        taksiranPersalinanDate: dayjs(taksiranPersalinan),
        tempatLahir: values.tempatLahir,
        tanggalLahir: dayjs(values.tanggalLahir),
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

      await createIbuHamil(data);

      message.success('Data ibu Hamil berhasil dibuat!');
      formIbuHamil.resetFields();
    } catch (error) {
      message.error('Gagal membuat data: ' + error.message);
    }
  };

  return (
    <>
      <Row>
        <Card
          title="Tambah Data Ibu Hamil"
          className=" shadow-primary"
          style={{ width: '100%' }}
        >
          <Form
            name="form-ibu-hamil"
            form={formIbuHamil}
            onFinish={onCreateData}
            onValuesChange={onValuesChange}
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
                    format="DD MMM YYYY"
                    value={dayjs('23 Sep 2020')}
                    placeholder="Pilih Tanggal"
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
                    format="DD MMM YYYY"
                    onChange={onHphtChange}
                    placeholder="Pilih tanggal"
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
                    format="DD MMM YYYY"
                    value={taksiranPersalinan}
                    placeholder={
                      taksiranPersalinan
                        ? dayjs(taksiranPersalinan).format('DD MMM YYYY')
                        : 'Pilih tanggal'
                    }
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
                <Form.Item label="Tanggal Lahir" name="tanggalLahir">
                  <DatePicker
                    className="!w-full"
                    format="DD MMM YYYY"
                    placeholder="Pilih tanggal"
                    rules={[
                      {
                        required: true,
                        message: 'Masukkan tanggal lahir',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Pendidikan Terakhir"
                  name="pendidikanTerakhir"
                >
                  <Input />
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
                  <Select placeholder="Pilih golongan darah">
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

            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form>
        </Card>
      </Row>
    </>
  );
}
