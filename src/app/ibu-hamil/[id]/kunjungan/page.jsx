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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { getAllKunjungan } from '@/libs/api/kunjunganIbuHamil';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.locale('id');

export default function Page() {
  const params = useParams();
  const ibuHamilId = params.id;
  const [data, setData] = useState([]);

  const dropdownItems = (id) => [
    {
      key: 'edit',
      label: <Link href={`/ibu-hamil/ubah-data/${id}`}>Ubah</Link>,
      icon: <EditOutlinedIcon />,
    },
    {
      key: 'hapus',
      label: (
        <Popconfirm
          title="Ingin menghapus data?"
          onConfirm={() => handleDelete(id)}
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
      render: (text, record, index) => index + 1,
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

  const getTableData = async () => {
    const res = await getAllKunjungan(ibuHamilId);
    if (res.data) {
      const kunjungan = res.data.map((item) => ({
        ...item,
        usia_kehamilan: `${item.usia_kehamilan} minggu`,
        tanggal_daftar: dayjs(item.tanggal_daftar).format('DD MMMM YYYY'),
      }));

      setData(kunjungan);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  const handleDelete = async (id) => {
    try {
      //   await deleteIbuHamil(id);

      //   const data = getTableData();

      //   setData(data.data);

      message.success('Data berhasil dihapus!');
    } catch (err) {
      message.error('Gagal menghapus data! ' + err.message);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Kunjungan Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Button
          type="primary"
          icon={<AddOutlinedIcon />}
          href="/ibu-hamil/kunjungan/tambah-data"
        >
          Kunjungan
        </Button>
      </Row>
      <Table columns={KUNJUNGAN_COLUMN} dataSource={data} bordered />
    </>
  );
}
