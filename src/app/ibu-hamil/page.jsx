import Title from 'antd/es/typography/Title';
import { Divider, Table, Row, Button } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { IBU_HAMIL_COLUMN } from '@/components/Tables/ibuHamilColumn';
import { fetchIbuHamil } from '@/libs/api/ibuHamil';

export default async function Page() {
  const dataIbuHamil = await fetchIbuHamil();

  return (
    <>
      <Row className="py-7">
        <Title level={3}>Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Button
          type="primary"
          icon={<AddOutlinedIcon />}
          href="/ibu-hamil/tambah-data"
        >
          Tambah Ibu Hamil
        </Button>
      </Row>
      <Table
        columns={IBU_HAMIL_COLUMN}
        dataSource={dataIbuHamil}
        bordered
        align="center"
      />
    </>
  );
}
