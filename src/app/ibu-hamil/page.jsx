import Title from 'antd/es/typography/Title';
import { Divider, Table } from 'antd';
import { IBU_HAMIL_COLUMN } from '@/components/Tables/ibuHamilColumn';

const dataSource = [
  {
    key: '1',
    no: 1,
    tanggal_daftar: 'New York No. 1 Lake Park',
    nik: 32,
    nama: 'John Brown',
  },
  {
    key: '2',
    no: 2,
    tanggal_daftar: 'New York No. 1 Lake Park',
    nik: 32,
    nama: 'John Brown',
  },
  {
    key: '3',
    no: '3',
    tanggal_daftar: 'New York No. 1 Lake Park',
    nik: 32,
    nama: 'John Brown',
  },
];

export default function page() {
  return (
    <>
      <div className="py-7">
        <Title level={3}>Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </div>

      <Table
        columns={IBU_HAMIL_COLUMN}
        dataSource={dataSource}
        bordered
        align="center"
      />
    </>
  );
}
