import React, { useState } from 'react';
import { Skeleton } from 'antd';

import { useAuth } from '../../utils/useAuth';

import { Navigate } from 'react-router';

export default function MVPAwardIndexView() {
    const auth = useAuth();
    const [formData, setFormData] = useState(null);

    if (!auth.user.roles.includes('mvpAwardsAccess'))
        return <Navigate to="/app/profile/me" />;

    return formData ? <Skeleton /> : <div>We has data</div>;
}
