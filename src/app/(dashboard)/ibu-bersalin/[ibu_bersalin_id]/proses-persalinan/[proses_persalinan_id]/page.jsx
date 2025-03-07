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
import { PROSES_PERSALINAN_DATA } from '@/constants/ibu-bersalin/prosesPersalinanData';
dayjs.locale('id');

export default function ProsesPersalinanDetailPage() {
  const [data, setData] = useState(PROSES_PERSALINAN_DATA);
  const params = useParams();
  const { ibu_bersalin_id, proses_persalinan_id } = useParams();

  useEffect(() => {
    const detailData = data.find(
      (item) => item.id === parseInt(proses_persalinan_id)
    );
    console.log('CEK DETAIL DATA : ', detailData);
    if (detailData) {
      setData(detailData);
    }
  }, [proses_persalinan_id]);

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Detail Data Proses Persalinan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row>
        <Card className=" shadow-primary" style={{ width: '100%' }}>
          <Row gutter={[16, 48]}>
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
                  HPHT
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
                  {dayjs(data.taksiran_persalinan).format('DD MMMM YYYY')}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Presentasi
                </Text>
                <Text className="!text-base">{data.presentasi}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Cara Persalinan
                </Text>
                <Text className="!text-base">{data.cara_persalinan}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Tempat
                </Text>
                <Text className="!text-base">{data.tempat}</Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Alamat
                </Text>
                <Text className="!text-base">
                  {data.alamat !== null || '' ? data.alamat : '-'}
                </Text>
              </Space>
            </Col>

            <Col span={6}>
              <Space direction="vertical" className="!gap-1.5">
                <Text type="secondary" className="font-semibold !text-sm">
                  Penolong
                </Text>
                <Text className="!text-base">
                  {data.penolong !== '' ? data.penolong : '-'}
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </Row>

      <Row justify="end" className="pt-6">
        <Link
          href={`/ibu-bersalin/${ibu_bersalin_id}/proses-persalinan`}
          className="py-2 px-9 font-medium text-black bg-[#ADD8E6] rounded-md hover:bg-[#ADD8E6]/75 hover:text-black/75"
        >
          Kembali
        </Link>
      </Row>
    </>
  );
}
