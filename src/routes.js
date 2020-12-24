import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import MainLayout from './layouts/MainLayout';
import LoginView from './views/auth/LoginView';
import NotFoundView from './views/error/NotFoundView';
import ServerErrorView from './views/error/ServerErrorView';
import RegisterView from './views/auth/RegisterView';
import ProfileView from './views/profile/ProfileView';
import OwnProfileView from './views/profile/OwnProfileView';
import DatabaseSearchView from './views/member-database/DatabaseSearchView.js';
import BranchListView from './views/member-database/BranchListView';

import DemoView from './views/demo';

const routes = [
    {
        path: 'app',
        element: <AppLayout />,
        children: [
            {
                path: 'profile',
                element: <Outlet />,
                children: [
                    { path: 'me', element: <OwnProfileView /> },
                    { path: ':profileId', element: <ProfileView /> },
                    { path: '/', element: <Navigate to="/app/profile/me" /> },
                ],
            },
            {
                path: 'member-database',
                element: <Outlet />,
                children: [
                    { path: 'search', element: <DatabaseSearchView /> },
                    {
                        path: 'branch',
                        element: <Outlet />,
                        children: [
                            {
                                path: ':branchName',
                                element: <BranchListView />,
                            },
                            { path: '/', element: <Navigate to="/404" /> },
                        ],
                    },
                ],
            },
            { path: 'demo', element: <DemoView /> },
            { path: '/', element: <Navigate to="/app/profile/me" /> },
            { path: '*', element: <Navigate to="/404" /> },
        ],
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'login', element: <LoginView /> },
            { path: 'register', element: <RegisterView /> },
            { path: '404', element: <NotFoundView /> },
            { path: '505', element: <ServerErrorView /> },
            { path: '/', element: <Navigate to="/app/profile/me" /> },
            { path: '*', element: <Navigate to="/404" /> },
        ],
    },
];

export default routes;
