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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Dashboard() {
  return (
    <>
      <div className="pb-7 pt-0">
        <Title level={3}>Dashboard</Title>
        <Divider className="border-2 !m-0" />
      </div>

      <Flex justify="space-between">
        <Card className="shadow sha " style={{ width: 280 }}>
          <Flex vertical>
            <Title level={5} type="primary">
              Ibu Hamil
            </Title>
            <p className="font-medium text-lg">86</p>
          </Flex>
        </Card>

        <Card className="shadow sha " style={{ width: 280 }}>
          <Flex vertical>
            <Title level={5}>Bersalin</Title>
            <p className="font-medium text-lg">86</p>
          </Flex>
        </Card>

        <Card className="shadow sha " style={{ width: 280 }}>
          <Flex vertical>
            <Title level={5}>Nifas</Title>
            <p className="font-medium text-lg">86</p>
          </Flex>
        </Card>

        <Card className="shadow sha " style={{ width: 280 }}>
          <Flex vertical>
            <Title level={5}>Keluarga Berencana</Title>
            <p className="font-medium text-lg">86</p>
          </Flex>
        </Card>

        <Card className="shadow sha " style={{ width: 280 }}>
          <Flex vertical>
            <Title level={5}>Bayi/Balita</Title>
            <p className="font-medium text-lg">86</p>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
