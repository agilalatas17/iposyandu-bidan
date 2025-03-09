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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useParams } from 'next/navigation';

import { KOMPLIKASI_DATA } from '@/constants/ibu-bersalin';

export default function KomplikasiPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(KOMPLIKASI_DATA);
  const { ibu_bersalin_id } = useParams();

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (komplikasiId) => [
    {
      key: 'edit',
      label: (
        <Link
          href={`/ibu-bersalin/${ibu_bersalin_id}/komplikasi/${komplikasiId}/ubah-data`}
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
          onConfirm={() => handleDelete(komplikasiId)}
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

  const KOMPLIKASI_COLUMN = [
    {
      key: '1',
      title: 'No',
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
      width: 30,
      align: 'center',
    },
    {
      key: '2',
      title: 'Obesitas',
      dataIndex: 'obesitas',
      width: 200,
      render: (text) => text ?? '-',
    },
    {
      key: '3',
      title: 'HDK',
      dataIndex: 'hdk',
      width: 200,
      render: (text) => text ?? '-',
    },
    {
      key: '4',
      title: 'PPP',
      dataIndex: 'ppp',
      width: 200,
      render: (text) => text ?? '-',
    },
    {
      key: '5',
      title: 'Infeksi',
      dataIndex: 'infeksi',
      width: 200,
      render: (text) => text ?? '-',
    },
    {
      key: '6',
      title: 'Lain-lain',
      dataIndex: 'lain_lain',
      render: (text) => text ?? '-',
    },
    {
      key: '7',
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
        <Title level={2}>Komplikasi Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Space>
          <Button
            type="primary"
            icon={<AddOutlinedIcon />}
            href={`/ibu-bersalin/${ibu_bersalin_id}/komplikasi/tambah-data`}
          >
            Komplikasi
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
        columns={KOMPLIKASI_COLUMN}
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
