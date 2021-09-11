import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
    UserOutlined,
    AreaChartOutlined,
    BookOutlined,
    ReadOutlined,
    UnorderedListOutlined,
    FileSearchOutlined,
    FormOutlined,
} from '@ant-design/icons';
import Axios from 'axios';

import { useAuth } from '../../utils/useAuth';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const auth = useAuth();
    const location = useLocation();
    const [elections, setElections] = useState(null);

    useEffect(
        () =>
            Axios.get('/api/voting', {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            }).then((res) => {
                let now = new Date();
                setElections({
                    all: res.data.data,
                    nominatePhase: res.data.data.filter(
                        (v) =>
                            now >= new Date(v.nominateStart) &&
                            now <= new Date(v.nominateEnd)
                    ),
                });
            }),
        []
    );

    return (
        <Menu
            theme="dark"
            mode="vertical"
            style={{ marginTop: '20px' }}
            selectedKeys={[location.pathname]}
        >
            <Menu.Item icon={<UserOutlined />} key="/app/profile/me">
                <Link to="/app/profile/me" />
                My Profile
            </Menu.Item>
            <Menu.SubMenu icon={<ReadOutlined />} title="Thesis Bank">
                <Menu.Item
                    key="/app/thesis-bank/search"
                    icon={<FileSearchOutlined />}
                >
                    <Link to={`/app/thesis-bank/search`} />
                    Search
                </Menu.Item>
                <Menu.Item
                    key="/app/thesis-bank/me"
                    icon={<UnorderedListOutlined />}
                >
                    <Link to={`/app/thesis-bank/me`} />
                    My Submissions
                </Menu.Item>
                <Menu.Item
                    key="/app/thesis-bank/submission"
                    icon={<FormOutlined />}
                >
                    <Link to={`/app/thesis-bank/submission`} />
                    New Submission
                </Menu.Item>
                <Menu.Item hidden>Pending Verification</Menu.Item>
            </Menu.SubMenu>
            {elections &&
                elections.all.map((election) => (
                    <Menu.SubMenu
                        key={election._id}
                        icon={<AreaChartOutlined />}
                        title={election.name}
                    >
                        <Menu.Item
                            key={`/app/voting/${election._id}/nomination`}
                            disabled={
                                !elections.nominatePhase.includes(election)
                            }
                        >
                            <Link
                                to={`/app/voting/${election._id}/nomination`}
                            />
                            Candidate Registration
                        </Menu.Item>
                        {election.voting.map((round, roundID) => (
                            <Menu.Item
                                key={`/app/voting/${election._id}/vote/${roundID}`}
                                disabled={
                                    new Date() < new Date(round.startDate)
                                }
                            >
                                <Link
                                    to={`/app/voting/${election._id}/vote/${roundID}`}
                                />
                                Voting Round {roundID + 1}
                            </Menu.Item>
                        ))}
                        <Menu.Item
                            key={`/app/voting/${election._id}/statistics`}
                            disabled={elections.nominatePhase.includes(
                                election
                            )}
                        >
                            <Link
                                to={`/app/voting/${election._id}/statistics`}
                            />
                            Statistics
                        </Menu.Item>
                    </Menu.SubMenu>
                ))}
            {auth.user.roles.includes('verified') && (
                <Menu.Item
                    icon={<AreaChartOutlined />}
                    key="/app/member-database/search"
                >
                    <Link to="/app/member-database/search" />
                    Member Summary
                </Menu.Item>
            )}
            {auth.user.roles.includes('voteOrganiser') && (
                <Menu.Item icon={<AreaChartOutlined />} key="/app/voting/admin">
                    <Link to="/app/voting/admin" />
                    Elections Admin
                </Menu.Item>
            )}
            {auth.user.roles.includes('dataAccess') && (
                <Menu.SubMenu
                    icon={<BookOutlined />}
                    title={`Chapter: ${auth.user.branch}`}
                >
                    <Menu.Item
                        key={`/app/member-database/branch/${auth.user.branch}`}
                    >
                        <Link
                            to={`/app/member-database/branch/${auth.user.branch}`}
                        />
                        Member List
                    </Menu.Item>
                    <Menu.Item hidden>Pending Verification</Menu.Item>
                </Menu.SubMenu>
            )}
            {auth.user.roles.includes('isicSciEssayAccess') && (
                <Menu.Item
                    icon={<UnorderedListOutlined />}
                    key="/app/essay-isic-sci/submissions"
                >
                    <Link to="/app/essay-isic-sci/submissions" />
                    ISIC x SCI Essays
                </Menu.Item>
            )}
            {auth.user.roles.includes('verifier') && (
                <Menu.Item
                    icon={<UnorderedListOutlined />}
                    key="/app/verifier/dashboard"
                >
                    <Link to="/app/verifier/dashboard">Verifier Dashboard</Link>
                </Menu.Item>
            )}
        </Menu>
    );
}

export default Sidebar;
