<<<<<<< HEAD
import React from 'react';
import { Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
=======
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

>>>>>>> faac44b5b78d8a0ffa1c8b0612cdb9cf9a3a6926
import { useAuth } from '../../utils/useAuth';

function OwnProfileView() {
    const auth = useAuth();
    const [counter, setCounter] = useState(0);

<<<<<<< HEAD
    useEffect(() => {
        setInterval(() => {
            setCounter(counter + 1);
        }, 100);
    }, []);

    useEffect(() => {
        console.log(counter);
    }, []);

=======
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

>>>>>>> faac44b5b78d8a0ffa1c8b0612cdb9cf9a3a6926
    return (
        <Card
            title={
                <span>
                    <UserOutlined /> My Profile
                </span>
            }
        >
<<<<<<< HEAD
            <Typography.Text>{`Branch           :   ${auth.user.branch}`}</Typography.Text>
            <br />
            <Typography.Text>{`Full Name        :   ${auth.user.fullName} `}</Typography.Text>
            <br />
            <Typography.Text>{`Date of Birth    :   ${new Date(
                auth.user.dob
            ).toLocaleDateString()}`}</Typography.Text>
            <br />
            <Typography.Text>{`Origin City      :   ${auth.user.originCity}`}</Typography.Text>
            <br />
            <Typography.Text>{`addressUK        :   ${auth.user.addressUK}`}</Typography.Text>
            <br />
            <Typography.Text>{`Postcode UK      :   ${auth.user.postcodeUK}`}</Typography.Text>
            <br />
            <Typography.Text>{`University       :   ${auth.user.university}`}</Typography.Text>
            <br />
            <Typography.Text>{`Degree Level     :   ${auth.user.degreeLevel}`}</Typography.Text>
            <br />
            <Typography.Text>{`Faculty          :   ${auth.user.faculty}`}</Typography.Text>
            <br />
            <Typography.Text>{`Course           :   ${auth.user.course}`}</Typography.Text>
            <br />
            <Typography.Text>{`Start Date       :   ${new Date(
                auth.user.startDate
            ).toLocaleDateString()}`}</Typography.Text>
            <br />
            <Typography.Text>{`End Date         :   ${new Date(
                auth.user.endDate
            ).toLocaleDateString()}`}</Typography.Text>
            <br />
            <Typography.Text>{`Funding Source   :   ${auth.user.fundingSource}`}</Typography.Text>
            <br />
            <Typography.Text>{`Email            :   ${auth.user.email}`}</Typography.Text>
            <br />
            <Typography.Text>{`Email Personal   :   ${auth.user.emailPersonal}`}</Typography.Text>
            <br />
            <Typography.Text>{`PhoneWA          :   ${auth.user.phoneWA}`}</Typography.Text>
            <br />
            <Typography.Text>{`Linkedin         :   ${auth.user.linkedin}`}</Typography.Text>
            <br />
        </Card>
    );
=======
            <Typography.Title level={5}>
                Full name:{' '}
                <Typography.Text>{`${auth.user.fullName}`}</Typography.Text>
            </Typography.Title>

            <br />
            <Typography.Text>{`Email: ${auth.user.email}`}</Typography.Text>
        </Card>
    );

>>>>>>> faac44b5b78d8a0ffa1c8b0612cdb9cf9a3a6926
    // Put profile here
    // <Table dataSource={dataSource} columns={columns} />
}

export default OwnProfileView;
