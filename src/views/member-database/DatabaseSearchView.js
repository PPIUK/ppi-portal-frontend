import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, Card, Input, Skeleton, Space, Table, Typography } from 'antd';
import { useAuth } from '../../utils/useAuth';
import { SearchOutlined } from '@ant-design/icons';

const baseURL =
    process.env.NODE_ENV == 'production'
        ? 'https://portal.ppiuk.org'
        : 'http://localhost:3001';

const tableStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function DatabaseSearchView() {
    const auth = useAuth();

    const [profilesData, setProfilesData] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [searchText, setSearchText] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const getData = () => {
        let sort = 'full_name:asc';
        axios
            .get('/api/profiles/public', {
                params: {
                    paginate: false,
                    sort: sort,
                },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                setProfilesData(resp.data.data.profiles);
            });
    };

    function getColumnSearchProps(dataIndex) {
        return {
            // eslint-disable-next-line react/display-name
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        style={{
                            width: 188,
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys, confirm, dataIndex)
                            }
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            // eslint-disable-next-line react/display-name
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{ color: filtered ? '#1890ff' : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current.select());
                }
            },
        };
    }

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    }

    function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
    }

    const profileTableCols = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: {
                compare: (a, b) => a.fullName.localeCompare(b.fullName),
                // multiple: 6,
            },
            ...getColumnSearchProps('fullName'),
            // eslint-disable-next-line react/display-name
            render: (text, row) => (
                <Typography.Link href={`${baseURL}/app/profile/${row._id}`}>
                    {text}
                </Typography.Link>
            ),
        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
            sorter: {
                compare: (a, b) => a.university.localeCompare(b.university),
                // multiple: 5,
            },
            ...getColumnSearchProps('university'),
        },
        {
            title: 'Degree Level',
            dataIndex: 'degreeLevel',
            key: 'degreeLevel',
            sorter: {
                compare: (a, b) => a.degreeLevel.localeCompare(b.degreeLevel),
                // multiple: 4,
            },
            ...getColumnSearchProps('degreeLevel'),
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
            key: 'faculty',
            sorter: {
                compare: (a, b) => a.faculty.localeCompare(b.faculty),
                // multiple: 3,
            },
            ...getColumnSearchProps('faculty'),
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            sorter: {
                compare: (a, b) => a.course.localeCompare(b.course),
                // multiple: 2,
            },
            ...getColumnSearchProps('course'),
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            sorter: {
                compare: (a, b) => a.branch.localeCompare(b.branch),
                // multiple: 1,
            },
            ...getColumnSearchProps('branch'),
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    return (
        <Card {...tableStyle}>
            <Typography.Title level={2}>Public Profile Info</Typography.Title>
            {profilesData && (
                <Table
                    columns={profileTableCols}
                    dataSource={profilesData}
                    scroll={{ x: true }}
                />
            )}
            {!profilesData && <Skeleton />}
        </Card>
    );
}

export default DatabaseSearchView;
