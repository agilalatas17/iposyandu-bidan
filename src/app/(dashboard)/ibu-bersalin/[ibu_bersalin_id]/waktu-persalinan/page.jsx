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
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useParams } from 'next/navigation';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';
dayjs.extend(localizedFormat);
dayjs.locale('id');

import { WAKTU_PERSALINAN_DATA } from '@/constants/ibu-bersalin/waktuPersalinanData';

export default function WaktuPersalinanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(WAKTU_PERSALINAN_DATA);
  const { ibu_bersalin_id } = useParams();

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (waktuPersalinanId) => [
    {
      key: 'edit',
      label: (
        <Link
          href={`/ibu-bersalin/${ibu_bersalin_id}/waktu-persalinan/${waktuPersalinanId}/ubah-data`}
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
          onConfirm={() => handleDelete(waktuPersalinanId)}
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
        <Title level={2}>Waktu Persalinan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Space>
          <Button
            type="primary"
            icon={<AddOutlinedIcon />}
            href={`/ibu-bersalin/${ibu_bersalin_id}/waktu-persalinan/tambah-data`}
          >
            Waktu Persalinan
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
        dataSource={data}
        loading={isLoading}
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
        bordered
      >
        <Column
          title="No"
          dataIndex="no"
          key="no"
          align="center"
          render={(text, record, index) => (page - 1) * 10 + (index + 1)}
          width={30}
        />
        <ColumnGroup title="Kala I Aktif">
          <Column
            title="Tanggal"
            dataIndex="kala_i_aktif_tanggal"
            key="kala_i_aktif_tanggal"
            render={(text) => (text ? dayjs(text).format('DD MMMM YYYY') : '-')}
          />
          <Column
            title="Jam"
            dataIndex="kala_i_aktif_jam"
            key="kala_i_aktif_jam"
            render={(text) =>
              text ? dayjs(text, 'HH:mm').format('HH:mm') : '-'
            }
          />
        </ColumnGroup>

        <ColumnGroup title="Kala II">
          <Column
            title="Tanggal"
            dataIndex="kala_ii_tanggal"
            key="kala_ii_tanggal"
            render={(text) => (text ? dayjs(text).format('DD MMMM YYYY') : '-')}
          />
          <Column
            title="Jam"
            dataIndex="kala_ii_jam"
            key="kala_ii_jam"
            render={(text) => (text ? dayjs(text).format('HH:mm') : '-')}
          />
        </ColumnGroup>

        <ColumnGroup title="Bayi Lahir">
          <Column
            title="Tanggal"
            dataIndex="bayi_lahir_tanggal"
            key="bayi_lahir_tanggal"
            render={(text) => (text ? dayjs(text).format('DD MMMM YYYY') : '-')}
          />
          <Column
            title="Jam"
            dataIndex="bayi_lahir_jam"
            key="bayi_lahir_jam"
            render={(text) => (text ? dayjs(text).format('HH:mm') : '-')}
          />
        </ColumnGroup>

        <ColumnGroup title="Plasenta Lahir">
          <Column
            title="Tanggal"
            dataIndex="plasenta_lahir_tanggal"
            key="plasenta_lahir_tanggal"
            render={(text) => (text ? dayjs(text).format('DD MMMM YYYY') : '-')}
          />
          <Column
            title="Jam"
            dataIndex="plasenta_lahir_jam"
            key="plasenta_lahir_jam"
            render={(text) => (text ? dayjs(text).format('HH:mm') : '-')}
          />
        </ColumnGroup>

        <Column
          title="Aksi"
          dataIndex="aksi"
          key="aksi"
          align="center"
          render={(_, record) => (
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
          )}
        />
      </Table>
    </>
  );
}
