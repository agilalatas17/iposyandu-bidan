'use client';

import { useState, useEffect } from 'react';
import { Row, Col, Card, Flex, Divider, Statistic, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { countIbuHamil } from '@/libs/api/ibuHamil';
import { refreshTokenUser } from '@/libs/api/auth';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [ibuHamil, setIbuHamil] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const ibuHamil = await countIbuHamil();

        setIbuHamil(ibuHamil);
      } catch (err) {
        message.open({
          type: 'error',
          message: err.message,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Dashboard</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row justify="space-between" gutter={[24]}>
        <Col span={8}>
          <Card className="shadow max-h-32 h-32">
            <Statistic
              className="font-semibold"
              title="Ibu Hamil"
              loading={isLoading}
              value={ibuHamil.jumlahIbuHamil}
              valueStyle={{ fontSize: '32px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card className="shadow max-h-32 h-32">
            <Statistic
              className="font-semibold"
              title="Bersalin"
              value={'12'}
              loading={isLoading}
              valueStyle={{ fontSize: '32px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card className="shadow max-h-32 h-32">
            <Statistic
              className="font-semibold"
              title="Nifas"
              value={'8'}
              loading={isLoading}
              valueStyle={{ fontSize: '32px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
