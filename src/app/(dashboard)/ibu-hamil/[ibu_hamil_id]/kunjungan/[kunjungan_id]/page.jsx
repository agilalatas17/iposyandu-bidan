'use client';

import { useState, useEffect } from 'react';
import { Card, Row, Space, Col, Divider, message } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getKunjunganById } from '@/libs/api/kunjunganIbuHamil';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.locale('id');

import { rehydrateToken } from '@/libs/axios';

export default function KunjunganDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const { ibu_hamil_id, kunjungan_id } = useParams();

  async function loadData() {
    try {
      const { data } = await getKunjunganById(kunjungan_id);
      setData(data);
    } catch (err) {
      message.open({
        type: 'error',
        message: 'Gagal memuat data!',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    rehydrateToken();
    loadData();
  }, []);

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Detail Data Kunjungan Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card
          className=" shadow-primary"
          style={{ width: '100%' }}
          loading={isLoading}
        >
          <Row gutter={[16, 48]}>
            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Tanggal Daftar
                </Text>
                <Text className="!text-base">
                  {dayjs(data.tanggal_daftar).format('DD MMMM YYYY')}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Usia Kehamilan
                </Text>
                <Text className="!text-base">{data.usia_kehamilan} Minggu</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Trimester Ke
                </Text>
                <Text className="!text-base">{data.trimester_ke}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Berat Badan
                </Text>
                <Text className="!text-base">
                  {data.berat_badan !== null ? data.berat_badan + ' Kg' : '-'}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Tinggi Badan
                </Text>
                <Text className="!text-base">
                  {data.tinggi_badan !== null ? data.tinggi_badan + ' cm' : '-'}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Indeks Masa Tubuh
                </Text>
                <Text className="!text-base">{data.indeks_masa_tubuh}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Tekanan Darah
                </Text>
                <Text className="!text-base">
                  {data.tekanan_darah !== null
                    ? data.tekanan_darah + ' mmHg'
                    : '-'}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Keluhan
                </Text>
                <Text className="!text-base">
                  {data.keluhan !== '' ? data.keluhan : '-'}
                </Text>
              </Space>
            </Col>
          </Row>

          <Row gutter={[16, 0]} className="mt-12">
            <Title level={5} className="w-full ps-2 !mb-4 !font-bold">
              Janin / Bayi
            </Title>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Detak Jantung Janin
                </Text>
                <Text className="!text-base">
                  {data.detak_jantung_janin !== null
                    ? data.detak_jantung_janin + ' x/menit'
                    : '-'}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Kepala Terhadap PAP
                </Text>
                <Text className="!text-base">
                  {data.kepala_thd_pap !== null ? data.kepala_thd_pap : '-'}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Taksiran Berat Badan Janin
                </Text>
                <Text className="!text-base">
                  {data.taksiran_bb_janin !== null
                    ? data.taksiran_bb_janin + ' gram'
                    : '-'}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Jumlah Janin
                </Text>
                <Text className="!text-base">
                  {data.jumlah_janin !== null ? data.jumlah_janin : '-'}
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </Row>

      <Row justify="end" className="pt-6">
        <Link
          href={`/ibu-hamil/${ibu_hamil_id}/kunjungan`}
          className="py-2 px-9 font-medium text-black bg-[#ADD8E6] rounded-md hover:bg-[#ADD8E6]/75 hover:text-black/75"
        >
          Kembali
        </Link>
      </Row>
    </>
  );
}
