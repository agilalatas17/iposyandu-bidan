import {
  Row,
  Col,
  Card,
  Flex,
  Divider,
  Space,
  Dropdown,
  Popconfirm,
  Tooltip,
} from 'antd';
import Title from 'antd/es/typography/Title';
import { countIbuHamil } from '@/libs/api/ibuHamil';

export default async function Dashboard() {
  const jumlahIbuHamilData = await countIbuHamil();
  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={3}>Dashboard</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row justify="space-between" gutter={[24]}>
        <Col span={8}>
          <Card className="shadow">
            <Flex vertical>
              <p className="mb-2 font-semibold">Ibu Hamil</p>
              <Title level={2} className="!m-0">
                {jumlahIbuHamilData.jumlahIbuHamil}
              </Title>
            </Flex>
          </Card>
        </Col>

        <Col span={8}>
          <Card className="shadow">
            <Flex vertical>
              <p className="mb-2 font-semibold">Bersalin</p>
              <Title level={2} className="!m-0">
                86
              </Title>
            </Flex>
          </Card>
        </Col>

        <Col span={8}>
          <Card className="shadow">
            <Flex vertical>
              <p className="mb-2 font-semibold">Nifas</p>
              <Title level={2} className="!m-0">
                86
              </Title>
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  );
}
