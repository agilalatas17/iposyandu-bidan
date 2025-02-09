'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Space, Col, Divider } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getIbuHamilById } from '@/libs/api/ibuHamil';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.locale('id');

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await getIbuHamilById(id);
      setData(response);
    }

    fetchData();
  }, []);

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Detail Data Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card className=" shadow-primary" style={{ width: '100%' }}>
          <Row gutter={[16, 48]} className="py-5">
            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Tanggal Daftar
                </Text>
                <Text className="!text-base">
                  {dayjs(data.tanggalDaftar).format('DD MMMM YYYY')}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  NIK
                </Text>
                <Text className="!text-base">{data.nik}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Nama
                </Text>
                <Text className="!text-base">{data.nama}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Hari Pertama Haid Terakhir
                </Text>
                <Text className="!text-base">
                  {dayjs(data.hpht).format('DD MMMM YYYY')}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Taksiran Persalinan
                </Text>
                <Text className="!text-base">
                  {dayjs(data.taksiranPersalinanDate).format('DD MMMM YYYY')}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Tempat Lahir
                </Text>
                <Text className="!text-base">{data.tempatLahir}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Tanggal Lahir
                </Text>
                <Text className="!text-base">
                  {dayjs(data.tanggalLahir).format('DD MMMM YYYY')}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Pendidikan Terakhir
                </Text>
                <Text className="!text-base">{data.pendidikanTerakhir}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Pekerjaan
                </Text>
                <Text className="!text-base">{data.pekerjaan}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Alamat
                </Text>
                <Text className="!text-base">{data.alamat}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Telepon
                </Text>
                <Text className="!text-base">{data.telepon}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Golongan Darah
                </Text>
                <Text className="!text-base">{data.golDarah}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Pembiayaan
                </Text>
                <Text className="!text-base">{data.pembiayaan}</Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  No JKN
                </Text>
                <Text className="!text-base">{data.noJkn}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Fasilitas Kesehatan Tingkat 1
                </Text>
                <Text className="!text-base">{data.faskes}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Fasilitas Kesehatan Rujukan
                </Text>
                <Text className="!text-base">{data.faskesRujukan}</Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </Row>

      <Row justify="end" className="pt-6">
        <Link
          href="/ibu-hamil"
          className="py-2 px-9 font-medium text-black bg-[#ADD8E6] rounded-md hover:bg-[#ADD8E6]/75 hover:text-black/75"
        >
          Kembali
        </Link>
      </Row>
    </>
  );
}
