import React from 'react';
import { useParams } from 'react-router';
import { Card } from 'antd';

import Thesis from '../components/Thesis';

export default function ThesisView() {
    const { thesisId } = useParams();

    return (
        <Card>
            <Thesis id={thesisId} />
        </Card>
    );
}
