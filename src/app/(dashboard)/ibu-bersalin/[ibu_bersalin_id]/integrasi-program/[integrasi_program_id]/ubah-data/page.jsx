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
  message,
  Select,
  Divider,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { useParams, useRouter } from 'next/navigation';

import { INTEGRASI_PROGRAM_DATA } from '@/constants/ibu-bersalin';
import {
  PROFILAKSIS_OPTIONS,
  TUBER_KULOSIS_OPTIONS,
  MALARIA_OPTIONS,
} from '@/constants/select-options';

export default function IntegrasiProgramUpdatePage() {
  const router = useRouter();
  const [formUbahIntegrasiProgram] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(INTEGRASI_PROGRAM_DATA);
  const { ibu_bersalin_id, integrasi_program_id } = useParams();

  useEffect(() => {
    const integrasiProgramData = data.find(
      (item) => item.id === parseInt(integrasi_program_id)
    );

    if (integrasiProgramData) {
      setData(integrasiProgramData);

      formUbahIntegrasiProgram.setFieldsValue({
        arv_profilaksis: integrasiProgramData.arv_profilaksis,
        obat_anti_malaria: integrasiProgramData.obat_anti_malaria,
        obat_anti_tb: integrasiProgramData.obat_anti_tb,
      });
    }
  }, [integrasi_program_id]);

  const onUpdateData = (values) => {
    try {
      setIsLoading(true);

      const updatedData = {
        ...data,
        ...values,
      };

      setData(updatedData);
      message.success('Berhasil mengubah data!');
      formUbahIntegrasiProgram.resetFields();
      router.push(`/ibu-bersalin/${ibu_bersalin_id}/integrasi-program`);
    } catch (err) {
      return message.error('Gagal mengubah data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Ubah Data Integrasi Program</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Form
            name="form-create-integrasi-program"
            form={formUbahIntegrasiProgram}
            onFinish={onUpdateData}
            layout="vertical"
          >
            <Row justify="space-between" gutter={[32, 40]}>
              <Col span={8}>
                <Form.Item label="ARV Profilaksis" name="arv_profilaksis">
                  <Select options={profilaksisOptions} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Obat Anti Malaria" name="obat_anti_malaria">
                  <Select options={malariaOptions} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Obat Anti Tb" name="obat_anti_tb">
                  <Select options={tuberkulosisOptions} />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end" className="mt-8">
              <Space size={32}>
                <Button
                  type="default"
                  href="/integrasi-program"
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
