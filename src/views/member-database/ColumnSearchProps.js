// eslint-disable-next-line no-unused-vars
import { useAuth } from '../../utils/useAuth';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { Button, Card, Input, Skeleton, Space, Table, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const getColumnSearchProps = (
    dataIndex,
    searchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
) => ({
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
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() =>
                    handleSearch(
                        selectedKeys,
                        confirm,
                        dataIndex,
                        setSearchText,
                        setSearchedColumn
                    )
                }
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() =>
                        handleSearch(
                            selectedKeys,
                            confirm,
                            dataIndex,
                            setSearchText,
                            setSearchedColumn
                        )
                    }
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => handleReset(clearFilters, setSearchText)}
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
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex]
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
            : '',
    onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current.select(), 100);
        }
    },
});

const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
    setSearchText,
    setSearchedColumn
) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters, setSearchText) => {
    clearFilters();
    setSearchText('');
};

export { getColumnSearchProps };
