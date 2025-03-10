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

import { KEADAAN_DATA } from '@/constants/ibu-bersalin';

export default function KeadaanUpdatePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(KEADAAN_DATA);
  const { ibu_bersalin_id } = useParams();

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (keadaanId) => [
    {
      key: 'edit',
      label: (
        <Link
          href={`/ibu-bersalin/${ibu_bersalin_id}/keadaan/${keadaanId}/ubah-data`}
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
          onConfirm={() => handleDelete(keadaanId)}
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
        <Title level={2}>Keadaan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Space>
          <Button
            type="primary"
            icon={<AddOutlinedIcon />}
            href={`/ibu-bersalin/${ibu_bersalin_id}/keadaan/tambah-data`}
          >
            Keadaan
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

        <ColumnGroup title="Ibu">
          <Column
            title="Keadaan"
            dataIndex="keadaan_ibu"
            key="keadaan_ibu"
            render={(text) => text ?? '-'}
          />
          <Column
            title="Status"
            dataIndex="status_ibu"
            key="status_ibu"
            render={(text) => text ?? '-'}
          />
        </ColumnGroup>

        <ColumnGroup title="Bayi">
          <Column
            title="Keadaan"
            dataIndex="keadaan_bayi"
            key="keadaan_bayi"
            render={(text) => text ?? '-'}
          />
          <Column
            title="Status"
            dataIndex="status_bayi"
            key="status_bayi"
            render={(text) => text ?? '-'}
          />
        </ColumnGroup>

        <Column
          title="Aksi"
          dataIndex="aksi"
          key="aksi"
          align="center"
          width={80}
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
