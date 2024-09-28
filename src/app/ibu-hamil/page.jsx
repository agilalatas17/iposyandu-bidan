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
import { getIbuHamil, deleteIbuHamil } from '@/libs/api/ibuHamil';

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
      label: (
        <Popconfirm>
          <Link href="#">Kunjungan</Link>
        </Popconfirm>
      ),
      icon: <EventAvailableIcon />,
    },
    {
      key: 'hapus',
      label: (
        <Popconfirm
          title="Ingin menghapus data?"
          onConfirm={() => handleDelete(id)}
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
          <Tooltip title="Detail" mouseEnterDelay={0.3}>
            <Link
              className="p-[6px] hover:bg-primary/60 bg-primary rounded"
              href={`/ibu-hamil/${record.id}`}
              key={record.id}
            >
              <VisibilityIcon fontSize="small" className="text-white" />
            </Link>
          </Tooltip>

          <Tooltip
            title="Lainnya"
            mouseEnterDelay={0.3}
            destroyTooltipOnHide={true}
          >
            <Dropdown
              className="p-[6px] bg-primary rounded hover:bg-primary/60"
              placement="top"
              trigger={['click']}
              menu={{ items: dropdownItems(record.id) }}
              arrow
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MoreHorizIcon color="primary" className="!text-white" />
                </Space>
              </a>
            </Dropdown>
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getTableData = async () => {
      const ibuHamil = await getIbuHamil();
      if (ibuHamil) {
        const formatData = ibuHamil.map((item) => ({
          ...item,
          tanggalDaftar: dayjs(item.tanggalDaftar).format('DD MMM YYYY'),
        }));

        setData(formatData);
      }
    };

    getTableData();
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await deleteIbuHamil(id);

      message.success('Data berhasil dihapus!');
    } catch (err) {
      message.error('Gagal menghapus data! ' + err.message);
    }
  };

  return (
    <>
      <Row className="pb-7 pt-0">
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
      <Table columns={IBU_HAMIL_COLUMN} dataSource={data} bordered />
    </>
  );
}
