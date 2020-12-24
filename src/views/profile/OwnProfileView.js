import React from 'react';
import { Card, Table, Typography } from 'antd';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';

const dataSource = [
    // Call personal profile from here
];

const columns = [
    { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
    { title: 'Origin City', dataIndex: 'originCity', key: 'originCity'},
    { title: 'Address', dataIndex: 'addressUK', key: 'address' },
    { title: 'Postcode UK', dataIndex: 'postcodeUK', key: 'postcodeUK'},
    { title: 'University', dataIndex: 'university', key:'university'},
    { title: 'Degree Level', dataIndex: 'degreeLevel', key: 'degreeLevel'},
    { title: 'Faculty', dataIndex: 'faculty', key: 'faculty'},
    { title: 'Phone WA', dataIndex:'phoneWA', key: 'phoneWA'},
    { title: 'Branch', dataIndex: 'branch', key:'branch'},
    { title: 'Course', dataIndex: 'course', key: 'course'},
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate'},
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate'},
    { title: 'Funding Source', dataIndex: 'fundingSource', key: 'fundingSource'},
    { title: 'Email', dataIndex: 'email', key: 'email'},
    { title: 'Email Personal', dataIndex: 'emailPersonal', key: 'emailPersonal'},
    { title: 'Facebook', dataIndex: 'facebook', key: 'facebook'},
    { title: 'Instagram', dataIndex: 'instagram', key: 'instagram'},
    { title: 'LinkedIn', dataIndex: 'linkedin', key: 'linkedin'},
];

function OwnProfileView() {
    return <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Profile
    </Typography.Title>;
    // Put profile here
    // <Table dataSource={dataSource} columns={columns} />
}

export default OwnProfileView;