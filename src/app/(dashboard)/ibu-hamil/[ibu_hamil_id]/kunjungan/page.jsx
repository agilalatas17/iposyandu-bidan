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
  message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.locale('id');

import { getAllKunjungan, deleteKunjungan } from '@/libs/api/kunjunganIbuHamil';
import { rehydrateToken } from '@/libs/axios';

export default function KunjunganPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();
  const { ibu_hamil_id } = params;

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (kunjunganId) => [
    {
      key: 'edit',
      label: (
        <Link
          href={`/ibu-hamil/${ibu_hamil_id}/kunjungan/${kunjunganId}/ubah-data/`}
        >
          Ubah
        </Link>
      ),
      icon: <EditOutlinedIcon />,
    },
    {
      key: 'hapus',
      label: (
        <Popconfirm
          title="Ingin menghapus data?"
          onConfirm={() => handleDelete(kunjunganId)}
          placement="left"
          okText="Ya"
          cancelText="Batal"
          arrow={false}
        >
          Hapus
        </Popconfirm>
      ),
      icon: <DeleteOutlineOutlinedIcon />,
    },
  ];

  const KUNJUNGAN_COLUMN = [
    {
      key: '1',
      title: 'No',
      render: (text, record, index) => (page - 1) * 10 + (index + 1),
      width: 30,
    },
    {
      key: '2',
      title: 'Tanggal Daftar',
      dataIndex: 'tanggal_daftar',
    },
    {
      key: '3',
      title: 'Usia Kehamilan',
      dataIndex: 'usia_kehamilan',
    },
    {
      key: '4',
      title: 'Trimester Ke',
      dataIndex: 'trimester_ke',
    },
    {
      key: '5',
      title: 'Aksi',
      width: 80,
      render: (_, record) => (
        <Space size={24}>
          <Tooltip title="Detail">
            <Link
              className="px-2 py-3 hover:bg-blue-600/60 bg-blue-600 rounded"
              href={`/ibu-hamil/${record.ibu_hamil_id}/kunjungan/${record.id}`}
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

  const loadData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getAllKunjungan(ibu_hamil_id);
      if (data) {
        const kunjungan = data.map((item) => ({
          ...item,
          usia_kehamilan: `${item.usia_kehamilan} minggu`,
          tanggal_daftar: dayjs(item.tanggal_daftar).format('DD MMMM YYYY'),
        }));

        setData(kunjungan);
      }

      message.open({
        type: 'success',
        content: 'Berhasil memuat data!',
      });
    } catch (err) {
      if (err.status === 404) {
        return null;
      }
      message.open({
        type: 'error',
        content: 'Gagal memuat data!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (kunjunganId) => {
    try {
      await deleteKunjungan(kunjunganId);

      const data = loadData();

      setData(data.data);

      message.success('Data berhasil dihapus!');
    } catch (err) {
      message.error('Gagal menghapus data! ' + err.message);
    }
  };

  useEffect(() => {
    rehydrateToken();
    loadData();
  }, []);

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Kunjungan Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Space>
          <Button
            type="primary"
            icon={<AddOutlinedIcon />}
            href={`/ibu-hamil/${ibu_hamil_id}/kunjungan/tambah-data`}
          >
            Kunjungan
          </Button>
          <Button
            className="border-primary"
            color="primary"
            variant="outlined"
            href="/ibu-hamil"
          >
            Kembali
          </Button>
        </Space>
      </Row>
      <Table
        columns={KUNJUNGAN_COLUMN}
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
