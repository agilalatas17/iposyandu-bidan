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
  InputNumber,
} from 'antd';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { useRouter, useParams } from 'next/navigation';
import { getIbuHamilById } from '@/libs/api/ibuHamil';
import { createKunjunganIbuHamil } from '@/libs/api/kunjunganIbuHamil';
import {
  hitungUsiaKehamilan,
  hitungIndeksMasaTubuh,
  tentukanTrimester,
} from '@/utils';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.locale('id');

const { Option } = Select;

export default function CreateKunjunganPage() {
  const [formCreateKunjungan] = Form.useForm();
  const params = useParams();
  const router = useRouter();
  const ibuHamilId = params.id;

  // REGEX
  const validateNumberInput = /^\d+$/;

  const onTanggalDaftarChange = async (date) => {
    if (date) {
      const resIbuHamil = await getIbuHamilById(ibuHamilId);
      const hpht = resIbuHamil.hpht;
      const tanggalDaftar = date;
      const usiaKehamilan = hitungUsiaKehamilan(hpht, tanggalDaftar);
      const trimester = tentukanTrimester(usiaKehamilan);
      formCreateKunjungan.setFieldsValue({
        usia_kehamilan: usiaKehamilan,
        trimester_ke: trimester,
      });
    }
  };

  const onBBTBChange = () => {
    const bb = formCreateKunjungan.getFieldValue('berat_badan');
    const tb = formCreateKunjungan.getFieldValue('tinggi_badan');
    const imt = hitungIndeksMasaTubuh(bb, tb);

    formCreateKunjungan.setFieldsValue({
      indeks_masa_tubuh: imt,
    });
  };

  const onCreateData = async (values) => {
    try {
      const body = {
        ibu_hamil_id: ibuHamilId,
        tanggal_daftar: values.tanggal_daftar,
        keluhan: values.keluhan,
        berat_badan: values.berat_badan,
        tinggi_badan: values.tinggi_badan,
        tekanan_darah: values.tekanan_darah,
        detak_jantung_janin: values.detak_jantung_janin,
        kepala_thd_pap: values.kepala_thd_pap,
        taksiran_bb_janin: values.taksiran_bb_janin,
        jumlah_janin: values.jumlah_janin,
      };

      await createKunjunganIbuHamil(body);

      message.success('Berhasil menambahkan data kunjungan!');
      formCreateKunjungan.resetFields();
      router.push(`/ibu-hamil/${ibuHamilId}/kunjungan`);
    } catch (err) {
      message.open({
        type: 'error',
        content: 'Gagal menambahkan data kunjungan!',
      });
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Tambah Data Kunjungan Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card className=" shadow-primary" style={{ width: '100%' }}>
          <Form
            name="form-kunjungan-ibu-hamil"
            form={formCreateKunjungan}
            onFinish={onCreateData}
            layout="vertical"
          >
            <Row justify="space-between" gutter={[16, 0]} wrap>
              <Col span={5}>
                <Form.Item
                  label="Tanggal Daftar"
                  name="tanggal_daftar"
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
                    onChange={onTanggalDaftarChange}
                    placeholder=""
                  />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Usia Kehamilan"
                  name="usia_kehamilan"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber suffix="Minggu" className="!w-full" disabled />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Trimester Ke"
                  name="trimester_ke"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber className="!w-full" disabled />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Berat Badan"
                  name="berat_badan"
                  rules={[
                    {
                      pattern: validateNumberInput,
                      message: 'Masukkan angka',
                    },
                  ]}
                >
                  <InputNumber
                    suffix="Kg"
                    className="!w-full"
                    onChange={onBBTBChange}
                  />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Tinggi Badan"
                  name="tinggi_badan"
                  rules={[
                    {
                      pattern: validateNumberInput,
                      message: 'Masukkan angka',
                    },
                  ]}
                >
                  <InputNumber
                    suffix="cm"
                    className="!w-full"
                    onChange={onBBTBChange}
                  />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="Indeks Masa Tubuh" name="indeks_masa_tubuh">
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Tekanan Darah"
                  name="tekanan_darah"
                  rules={[
                    {
                      pattern: validateNumberInput,
                      message: 'Masukkan angka',
                    },
                  ]}
                >
                  <InputNumber suffix="mmHg" className="!w-full" />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="Keluhan" name="keluhan">
                  <TextArea
                    showCount
                    maxLength={100}
                    allowClear
                    style={{ height: 80, resize: 'none' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row
              justify="space-between"
              gutter={[16, 0]}
              wrap
              className="mt-12"
            >
              <Title level={4} className="w-full ps-2 !mb-4 !font-bold">
                Janin / Bayi
              </Title>

              <Col span={5}>
                <Form.Item
                  label="Detak Jantung Janin"
                  name="detak_jantung_janin"
                  rules={[
                    {
                      pattern: validateNumberInput,
                      message: 'Masukkan angka',
                    },
                  ]}
                >
                  <InputNumber suffix="x/menit" className="!w-full" />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="Kepala Terhadap PAP" name="kepala_thd_pap">
                  <Select placeholder="">
                    <Option value="M">M</Option>
                    <Option value="BM">BM</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item
                  label="Taksiran Berat Badan Janin"
                  name="taksiran_bb_janin"
                  rules={[
                    {
                      pattern: validateNumberInput,
                      message: 'Masukkan angka',
                    },
                  ]}
                >
                  <Input suffix="gram" className="!w-full" />
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="Jumlah Janin" name="jumlah_janin">
                  <Select placeholder="">
                    <Option value="T">T</Option>
                    <Option value="G">G</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href={`/ibu-hamil/${ibuHamilId}/kunjungan`}
                  size="large"
                  danger
                >
                  Batal
                </Button>
                <Button type="primary" htmlType="submit" size="large">
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
