import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import axios from 'axios';
import { Link } from 'react-router-dom';

const baseURL =
    process.env.NODE_ENV == 'production'
        ? 'https://portal.ppiuk.org'
        : 'http://localhost:3000';

export default function Thesis({ id }) {
    const [thesis, setThesis] = useState(null);

    useEffect(() => {
        axios.get(`/api/thesis/${id}`).then((res) => {
            const data = res.data.data;
            setThesis(data);
        });
    }, []);

    return (
        thesis && (
            <div>
                <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    {thesis.title}
                </Typography.Title>
                <Typography.Title level={5}>Abstract</Typography.Title>
                <Typography>{thesis.abstract}</Typography>
                <br />
                <Typography>Item type: {thesis.itemType}</Typography>
                <Typography>Year: {thesis.year}</Typography>
                <Typography>
                    Authors:{' '}
                    {thesis.authors
                        .map((author) => {
                            return author._id === undefined ? (
                                author.fullName
                            ) : (
                                <Link to={`/app/profile/${author._id}`}>
                                    {author.fullName}
                                </Link>
                            );
                        })
                        .reduce((prev, curr) => [prev, ', ', curr])}
                </Typography>
                <Typography>
                    Contributor/Contact Person:{' '}
                    {thesis.correspondingAuthor._id === undefined ? (
                        thesis.correspondingAuthor.fullName
                    ) : (
                        <Link
                            to={`/app/profile/${thesis.correspondingAuthor._id}`}
                        >
                            {thesis.correspondingAuthor.fullName}
                        </Link>
                    )}
                </Typography>
                <Typography>University: {thesis.university}</Typography>
                {thesis.link && (
                    <Typography>
                        URL: <a>{thesis.link}</a>
                    </Typography>
                )}
                {thesis.fileId && (
                    <Typography.Title level={5}>
                        Download File{' '}
                        <a href={`${baseURL}/api/thesis/${thesis._id}/pdf`}>
                            <DownloadOutlined style={{ fontSize: '24px' }} />
                        </a>
                    </Typography.Title>
                )}
            </div>
        )
    );
}
