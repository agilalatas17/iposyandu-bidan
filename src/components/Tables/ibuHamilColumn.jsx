'use client';
import { Space, Dropdown, Tooltip } from 'antd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from 'next/link';

const dropdownItems = (id) => [
  {
    key: 'edit',
    label: <Link href={`/ibu-hamil/ubah-data/${id}`}>Ubah</Link>,
    icon: <EditOutlinedIcon />,
  },
  {
    key: 'kunjungan',
    label: <Link href="#">Kunjungan</Link>,
    icon: <EventAvailableIcon />,
  },
  {
    key: 'hapus',
    label: <Link href="#">Hapus</Link>,
    icon: <DeleteOutlineOutlinedIcon />,
  },
];

export const IBU_HAMIL_COLUMN = [
  {
    key: '1',
    title: 'No',
    render: (text, record, index) => index + 1,
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

        <Tooltip title="Lainnya" mouseEnterDelay={0.3}>
          <Dropdown
            menu={{ items: dropdownItems(record.id) }}
            trigger={['click']}
            arrow
            className="p-[6px] bg-primary rounded hover:bg-primary/60"
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
