import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Button, Card, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import ThesesTable from '../components/ThesesTable';
import { CSVLink } from 'react-csv';
import { useAuth } from '../../../utils/useAuth';

export default function ThesisSearchView() {
    const auth = useAuth();
    const [theses, setTheses] = useState(null);

    useEffect(() => {
        // fetch data
        axios.get(`/api/thesis`).then((res) => {
            setTheses(res.data.theses);
        });
    }, []);
    return (
        <Card
            title={
                <span>
                    <SearchOutlined /> Search
                </span>
            }
        >
            {auth.user.roles.includes('thesisAdmin') ? (
                <CSVLink
                    filename={`Thesis-Bank-${Date.now()}.csv`}
                    data={theses.map(
                        // eslint-disable-next-line no-unused-vars
                        ({ _id, authors, correspondingAuthor, ...others }) => {
                            if (typeof correspondingAuthor !== 'string') {
                                correspondingAuthor = correspondingAuthor.name;
                            }
                            return { correspondingAuthor, ...others };
                        }
                    )}
                >
                    <Button type="primary">Download as CSV file</Button>
                </CSVLink>
            ) : null}
            {theses ? (
                <ThesesTable theses={theses} isPublic={false} />
            ) : (
                <Spin />
            )}
        </Card>
    );
}
