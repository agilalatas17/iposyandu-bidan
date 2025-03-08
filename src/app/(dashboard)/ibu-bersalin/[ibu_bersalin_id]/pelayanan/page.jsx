'use client';

import { useState, useEffect } from 'react';
import {
  Divider,
  Table,
  Row,
  Button,
  Space,
  Dropdown,
  Tooltip,
  Popconfirm,
} from 'antd';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useParams } from 'next/navigation';

import { PELAYANAN_DATA } from '@/constants/ibu-bersalin';

export default function PelayananPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(PELAYANAN_DATA);
  const { ibu_bersalin_id } = useParams();

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (pelayananId) => [
    {
      key: 'edit',
      label: (
        <Link
          href={`/ibu-bersalin/${ibu_bersalin_id}/pelayanan/${pelayananId}/ubah-data`}
        >
          Ubah
        </Link>
      ),
    },
    {
      key: 'hapus',
      label: (
        <Popconfirm
          title="Ingin menghapus data?"
          onConfirm={() => handleDelete(pelayananId)}
          placement="left"
          okText="Ya"
          cancelText="Batal"
          arrow={false}
        >
          Hapus
        </Popconfirm>
      ),
    },
  ];

  const PELAYANAN_COLUMN = [
    {
      key: '1',
      title: 'No',
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
      width: 30,
      align: 'center',
    },
    {
      key: '2',
      title: 'Menggunakan Partograf',
      dataIndex: 'menggunakan_partograf',
      render: (text) => text ?? '-',
    },
    {
      key: '3',
      title: 'Cata di Buku KIA',
      dataIndex: 'catat_di_buku_kia',
      render: (text) => text ?? '-',
    },
    {
      key: '4',
      title: 'Inisiasi Menyusui Dini',
      dataIndex: 'inisiasi_menyusui_dini',
      render: (text) => text ?? '-',
    },
    {
      key: '5',
      title: 'Aksi',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <Tooltip title="Lainnya" destroyTooltipOnHide={true}>
          <Dropdown
            className="px-1.5 py-3 bg-blue-600 rounded hover:bg-blue-600/60"
            placement="bottomLeft"
            trigger={['click']}
            menu={{ items: dropdownItems(record.id) }}
            arrow
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreHorizIcon className="!text-white" />
              </Space>
            </a>
          </Dropdown>
        </Tooltip>
      ),
    },
  ];

  const handleDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Pelayanan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Space>
          <Button
            type="primary"
            icon={<AddOutlinedIcon />}
            href={`/ibu-bersalin/${ibu_bersalin_id}/pelayanan/tambah-data`}
          >
            Pelayanan
          </Button>

          <Button
            className="border-primary"
            color="primary"
            variant="outlined"
            href="/ibu-bersalin"
          >
            Kembali
          </Button>
        </Space>
      </Row>
      <Table
        rowKey="id"
        columns={PELAYANAN_COLUMN}
        loading={isLoading}
        dataSource={data}
        pagination={{
          position: ['bottomLeft'],
          defaultCurrent: 1,
          current: page,
          defaultPageSize: 10,
          pageSize: 10,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} dari total ${total} data`,
          onChange: (value) => {
            setPage(value);
          },
        }}
        rowClassName={(record, index) => {
          return index % 2 === 1 ? 'bg-[#EFF6FF]' : '';
        }}
        size="middle"
        bordered
      />
    </>
  );
}
