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

import { MANAJEMEN_AKTIF_KALA_TIGA_DATA } from '@/constants/ibu-bersalin';

export default function ManajemenAktifKalaTigaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(MANAJEMEN_AKTIF_KALA_TIGA_DATA);
  const { ibu_bersalin_id } = useParams();

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (manajemenId) => [
    {
      key: 'edit',
      label: (
        <Link
          href={`/ibu-bersalin/${ibu_bersalin_id}/manajemen-aktif-kala-tiga/${manajemenId}/ubah-data`}
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
          onConfirm={() => handleDelete(manajemenId)}
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

  const MANAJEMEN_KALA_TIGA_COLUMN = [
    {
      key: '1',
      title: 'No',
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
      width: 30,
      align: 'center',
    },
    {
      key: '2',
      title: 'Injeksi Oksitosin',
      dataIndex: 'injeksi_oksitosin',
      width: 200,
      render: (text) => text ?? '-',
    },
    {
      key: '3',
      title: 'Peregangan Tali Pusat',
      dataIndex: 'peregangan_tali_pusat',
      width: 200,
      render: (text) => text ?? '-',
    },
    {
      key: '4',
      title: 'Masase Fundus Uteri',
      dataIndex: 'masase_fundus_uteri',
      width: 200,
      render: (text) => text ?? '-',
    },
    {
      key: '5',
      title: 'Aksi',
      align: 'center',
      width: 60,
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
        <Title level={2}>Manajemen Aktif Kala III Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Space>
          <Button
            type="primary"
            icon={<AddOutlinedIcon />}
            href={`/ibu-bersalin/${ibu_bersalin_id}/manajemen-aktif-kala-tiga/tambah-data`}
          >
            Manajemen Aktif Kala III
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
        columns={MANAJEMEN_KALA_TIGA_COLUMN}
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
