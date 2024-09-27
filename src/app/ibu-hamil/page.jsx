'use client';

import { useState, useEffect } from 'react';
import Title from 'antd/es/typography/Title';
import { Divider, Table, Row, Button } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { IBU_HAMIL_COLUMN } from '@/components/Tables/ibuHamilColumn';
import { getIbuHamil } from '@/libs/api/ibuHamil';

export default function Page() {
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTableData = async () => {
      const ibuHamil = await getIbuHamil();
      if (ibuHamil) {
        setData(ibuHamil);
      }
    };

    getTableData();
  }, []);

  console.log('GET DATA IBU HAMIL', data);

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
        dataSource={data}
        bordered
        align="center"
      />
    </>
  );
}
