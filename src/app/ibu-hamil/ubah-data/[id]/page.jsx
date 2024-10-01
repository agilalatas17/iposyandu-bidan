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
import { useParams, useRouter } from 'next/navigation';
import { updateIbuHamil, getIbuHamil } from '@/libs/api/ibuHamil';
const { Option } = Select;

export default function Page() {
  const [formUbahIbuHamil] = Form.useForm();
  const { id } = useParams();
  const router = useRouter();

  const onHphtChange = (date) => {
    if (date) {
      const taksiranPersalinan = dayjs(date).add(280, 'days');
      formUbahIbuHamil.setFieldsValue({
        taksiranPersalinanDate: taksiranPersalinan,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getIbuHamilData = await getIbuHamil(id);

        if (getIbuHamilData) {
          console.log('IBU HAMIL SEBELUM SET FIELD VALUES', getIbuHamilData);
          formUbahIbuHamil.setFieldsValue({
            ...getIbuHamilData,
            tanggalDaftar: dayjs(getIbuHamilData.tanggalDaftar),
            hpht: dayjs(getIbuHamilData.hpht),
            taksiranPersalinanDate: dayjs(
              getIbuHamilData.taksiranPersalinanDate
            ),
            tanggalLahir: dayjs(getIbuHamilData.tanggalLahir),
          });
        }
      } catch (err) {
        message.open({
          type: 'error',
          message: 'Gagal memuat data' + err.message,
        });
      }
    };

    fetchData();
  }, []);

  const onUpdateData = async (values) => {
    console.log('ON UPDATE DATA', values);
    try {
      const data = {
        tanggalDaftar: values.tanggalDaftar
          ? dayjs(values.tanggalDaftar).format('YYYY-MM-DD')
          : null,
        nik: values.nik,
        nama: values.nama,
        hpht: values.hpht ? dayjs(values.hpht).format('YYYY-MM-DD') : null,
        tempatLahir: values.tempatLahir,
        tanggalLahir: values.tanggalLahir
          ? dayjs(values.tanggalLahir).format('YYYY-MM-DD')
          : null,
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

      await updateIbuHamil(id, data);
      message.success('Berhasil mengubah data');
      formUbahIbuHamil.resetFields();
      router.push('/ibu-hamil');
    } catch (error) {
      message.error('Gagal mengubah data');
    }
  };

  return (
    <>
      <Row>
        <Card
          title="Ubah Data Ibu Hamil"
          className=" shadow-primary"
          style={{ width: '100%' }}
        >
          <Form
            name="form-ibu-hamil"
            form={formUbahIbuHamil}
            onFinish={onUpdateData}
            layout="vertical"
          >
            <Flex justify="space-between" wrap gap={24}>
              <Col span={5}>
                <Form.Item label="Tanggal Daftar" name="tanggalDaftar">
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
                  <Select placeholder="Pilih pendidikan terakhir">
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
                <Button type="primary" htmlType="submit" size="large">
                  Simpan
                </Button>
                <Button type="default" href="/ibu-hamil" size="large" danger>
                  Batal
                </Button>
              </Space>
            </Flex>
          </Form>
        </Card>
      </Row>
    </>
  );
}
