import React, { useState } from 'react';
import { Skeleton } from 'antd';

import { useAuth } from '../../utils/useAuth';

import { Navigate } from 'react-router';

export default function MVPAwardIndexView() {
    const auth = useAuth();
    const [formsData, setFormsData] = useState([]);

    if (!auth.user.roles.includes('mvpAwardsAccess'))
        return <Navigate to="/app/profile/me" />;

    return formsData.length === 0 ? <Skeleton /> : <div>We has data</div>;
}
