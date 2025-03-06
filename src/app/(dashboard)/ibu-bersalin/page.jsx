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

import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

import { IBU_BERSALIN_DATA } from '@/constants/ibu-bersalin/ibuBersalinData';

export default function IbuBersalinPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(IBU_BERSALIN_DATA);

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (bersalinId) => [
    {
      key: 'edit',
      label: <Link href={`/ibu-bersalin/${bersalinId}/ubah-data`}>Ubah</Link>,
    },
    {
      key: 'proses_persalinan',
      label: (
        <Link href={`/ibu-bersalin/${bersalinId}/proses-persalinan`}>
          Proses Persalinan
        </Link>
      ),
    },
    {
      key: 'waktu_persalinan',
      label: (
        <Link href={`/ibu-bersalin/${bersalinId}/waktu-persalinan`}>
          Waktu Persalinan
        </Link>
      ),
    },
    {
      key: 'hapus',
      label: (
        <Popconfirm
          title="Ingin menghapus data?"
          onConfirm={() => handleDelete(bersalinId)}
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

  const IBU_BERSALIN_COLUMN = [
    {
      key: '1',
      title: 'No',
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
      width: 30,
    },
    {
      key: '2',
      title: 'Tanggal Daftar',
      dataIndex: 'tgl_daftar',
      render: (text) => dayjs(text).format('DD MMMM YYYY'),
    },
    {
      key: '3',
      title: 'Nama Ibu Hamil',
      dataIndex: 'ibu_hamil',
    },
    {
      key: '4',
      title: 'No Register Kohort',
      dataIndex: 'no_register_kohort',
    },
    {
      key: '5',
      title: 'Aksi',
      width: 80,
      render: (_, record) => (
        <Space>
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
        <Title level={2}>Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Button
          type="primary"
          icon={<AddOutlinedIcon />}
          href="/ibu-bersalin/tambah-data"
        >
          Ibu Bersalin
        </Button>
      </Row>
      <Table
        rowKey="id"
        columns={IBU_BERSALIN_COLUMN}
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
