import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';

import Thesis from '../components/Thesis';

export default function PublicThesisView() {
    const { id } = useParams();
    return (
        <div>
            <Link to={'/thesis'}>
                <RollbackOutlined />
                Go back to thesis directory
            </Link>

            <Thesis id={id} />
        </div>
    );
}
