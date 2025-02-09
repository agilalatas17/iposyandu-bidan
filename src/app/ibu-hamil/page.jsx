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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import dayjs from 'dayjs';
import 'dayjs/locale/id';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
dayjs.locale('id');

import { getAllIbuHamil, deleteIbuHamil } from '@/libs/api/ibuHamil';

export default function Page() {
  const [data, setData] = useState([]);

  const dropdownItems = (id) => [
    {
      key: 'edit',
      label: <Link href={`/ibu-hamil/ubah-data/${id}`}>Ubah</Link>,
      icon: <EditOutlinedIcon />,
    },
    {
      key: 'kunjungan',
      label: <Link href={`/ibu-hamil/${id}/kunjungan`}>Kunjungan</Link>,
      icon: <EventAvailableIcon />,
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

  const IBU_HAMIL_COLUMN = [
    {
      key: '1',
      title: 'No',
      render: (text, record, index) => index + 1,
      width: 30,
    },
    {
      key: '2',
      title: 'Tanggal Daftar',
      dataIndex: 'tanggalDaftar',
    },
    {
      key: '3',
      title: 'NIK',
      dataIndex: 'nik',
    },
    {
      key: '4',
      title: 'Nama',
      dataIndex: 'nama',
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
              href={`/ibu-hamil/${record.id}`}
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
    const res = await getAllIbuHamil();
    if (res) {
      const ibuHamil = res.map((item) => ({
        ...item,
        tanggalDaftar: dayjs(item.tanggalDaftar).format('DD MMM YYYY'),
      }));

      setData(ibuHamil);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteIbuHamil(id);

      const data = getTableData();

      setData(data.data);

      message.success('Data berhasil dihapus!');
    } catch (err) {
      message.error('Gagal menghapus data! ' + err.message);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
        <Title level={2}>Ibu Hamil</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Button
          type="primary"
          icon={<AddOutlinedIcon />}
          href="/ibu-hamil/tambah-data"
        >
          Ibu Hamil
        </Button>
      </Row>
      <Table columns={IBU_HAMIL_COLUMN} dataSource={data} bordered />
    </>
  );
}
