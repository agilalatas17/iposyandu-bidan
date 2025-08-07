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

import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

import { PROSES_PERSALINAN_DATA } from '@/constants/ibu-bersalin';

export default function ProsesPersalinanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(PROSES_PERSALINAN_DATA);
  const { ibu_bersalin_id } = useParams();

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (prosesPersalinanId) => [
    {
      key: 'edit',
      label: (
        <Link
          href={`/ibu-bersalin/${ibu_bersalin_id}/proses-persalinan/${prosesPersalinanId}/ubah-data`}
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
          onConfirm={() => handleDelete(prosesPersalinanId)}
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

  const PROSES_PERSALINAN_COLUMN = [
    {
      key: '1',
      title: 'No',
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
      width: 30,
    },
    {
      key: '2',
      title: 'Usia Kehamilan',
      dataIndex: 'usia_kehamilan',
      render: (text) => `${text} Minggu`,
    },
    {
      key: '3',
      title: 'HPHT',
      dataIndex: 'hpht',
      render: (text) => dayjs(text).format('DD MMMM YYYY'),
    },
    {
      key: '4',
      title: 'Taksiran Persalinan',
      dataIndex: 'taksiran_persalinan',
      render: (text) => dayjs(text).format('DD MMMM YYYY'),
    },
    {
      key: '5',
      title: 'Presentasi',
      dataIndex: 'presentasi',
    },
    {
      key: '6',
      title: 'Aksi',
      width: 80,
      render: (_, record) => (
        <Space size={24}>
          <Tooltip title="Detail">
            <Link
              className="px-2 py-3 hover:bg-blue-600/60 bg-blue-600 rounded"
              href={`/ibu-bersalin/${ibu_bersalin_id}/proses-persalinan/${record.id}`}
              key={record.id}
            >
              <VisibilityIcon fontSize="small" className="text-white" />
            </Link>
          </Tooltip>

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
        </Space>
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
        <Title level={2}>Proses Persalinan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Space>
          <Button
            type="primary"
            icon={<AddOutlinedIcon />}
            href={`/ibu-bersalin/${ibu_bersalin_id}/proses-persalinan/tambah-data`}
          >
            Proses Persalinan
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
        columns={PROSES_PERSALINAN_COLUMN}
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
          return index % 2 === 1 ? 'bg-primary/10' : '';
        }}
        size="middle"
        bordered
      />
    </>
  );
}
