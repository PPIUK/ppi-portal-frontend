import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../utils/useAuth';

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
    }, []);

    return (
        <Card
            title={
                <span>
                    <UserOutlined /> My Profile
                </span>
            }
        >
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
}

export default OwnProfileView;
