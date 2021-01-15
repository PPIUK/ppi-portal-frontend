/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useAuth } from '../../utils/useAuth';

const dataSource = [
    // Call personal profile from here
];

const columns = [
    { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
    { title: 'Origin City', dataIndex: 'originCity', key: 'originCity' },
    { title: 'Address', dataIndex: 'addressUK', key: 'address' },
    { title: 'Postcode UK', dataIndex: 'postcodeUK', key: 'postcodeUK' },
    { title: 'University', dataIndex: 'university', key: 'university' },
    { title: 'Degree Level', dataIndex: 'degreeLevel', key: 'degreeLevel' },
    { title: 'Faculty', dataIndex: 'faculty', key: 'faculty' },
    { title: 'Phone WA', dataIndex: 'phoneWA', key: 'phoneWA' },
    { title: 'Branch', dataIndex: 'branch', key: 'branch' },
    { title: 'Course', dataIndex: 'course', key: 'course' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    {
        title: 'Funding Source',
        dataIndex: 'fundingSource',
        key: 'fundingSource',
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
        title: 'Email Personal',
        dataIndex: 'emailPersonal',
        key: 'emailPersonal',
    },
    { title: 'Facebook', dataIndex: 'facebook', key: 'facebook' },
    { title: 'Instagram', dataIndex: 'instagram', key: 'instagram' },
    { title: 'LinkedIn', dataIndex: 'linkedin', key: 'linkedin' },
];

function OwnProfileView() {
    const auth = useAuth();
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCounter(counter + 1);
        }, 100);
    }, []);

    useEffect(() => {
        console.log(counter);
    }, [counter]);

    return (
        <Card
            title={
                <span>
                    <UserOutlined /> My Profile
                </span>
            }
        >
            <Typography.Title level={5}>
                Full name:{' '}
                <Typography.Text>{`${auth.user.fullName}`}</Typography.Text>
            </Typography.Title>

            <br />
            <Typography.Text>{`Email: ${auth.user.email}`}</Typography.Text>
        </Card>
    );

    // Put profile here
    // <Table dataSource={dataSource} columns={columns} />
}

export default OwnProfileView;
