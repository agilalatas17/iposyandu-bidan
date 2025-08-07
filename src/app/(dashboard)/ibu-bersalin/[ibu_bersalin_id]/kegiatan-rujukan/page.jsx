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

import { KEGIATAN_RUJUKAN_DATA } from '@/constants/ibu-bersalin';
import { YA_TIDAK_OPTIONS } from '@/constants/select-options';

export default function KegiatanRujukanPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(KEGIATAN_RUJUKAN_DATA);
  const { ibu_bersalin_id } = useParams();

  // Pagination
  const [page, setPage] = useState(1);

  const dropdownItems = (kegiatanRujukanId) => [
    {
      key: 'edit',
      label: (
        <Link
          href={`/ibu-bersalin/${ibu_bersalin_id}/kegiatan-rujukan/${kegiatanRujukanId}/ubah-data`}
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
          onConfirm={() => handleDelete(kegiatanRujukanId)}
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
        <Title level={2}>Kegiatan Rujukan Ibu Bersalin</Title>
        <Divider className="border-2 !m-0" />
      </Row>

      <Row className="pb-4" justify="end">
        <Space>
          <Button
            type="primary"
            icon={<AddOutlinedIcon />}
            href={`/ibu-bersalin/${ibu_bersalin_id}/kegiatan-rujukan/tambah-data`}
          >
            Kegiatan Rujukan
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
          return index % 2 === 1 ? 'bg-primary/10' : '';
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

        <ColumnGroup title="Faskes">
          <Column
            title="Puskesmas"
            dataIndex="faskes_puskesmas"
            key="faskes_puskesmas"
            width={160}
            render={(text) => text ?? '-'}
          />
          <Column
            title="Rumah Bersalin"
            dataIndex="faskes_rumah_bersalin"
            key="faskes_rumah_bersalin"
            width={160}
            render={(text) => text ?? '-'}
          />
          <Column
            title="RSIA / RSIB"
            dataIndex="faskes_rsia"
            key="faskes_rsia"
            width={160}
            render={(text) => text ?? '-'}
          />
          <Column
            title="RS"
            dataIndex="faskes_rs"
            key="faskes_rs"
            width={160}
            render={(text) => text ?? '-'}
          />
          <Column
            title="Lain-lain"
            dataIndex="faskes_lain_lain"
            key="faskes_lain_lain"
            render={(text) => text ?? '-'}
          />
        </ColumnGroup>

        <ColumnGroup title="Keadaan">
          <Column
            title="Tiba"
            dataIndex="keadaan_tiba"
            key="keadaan_tiba"
            width={140}
            render={(text) => text ?? '-'}
          />
          <Column
            title="Pulang"
            dataIndex="keadaan_pulang"
            key="keadaan_pulang"
            width={140}
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
