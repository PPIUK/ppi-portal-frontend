import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import MainLayout from './layouts/MainLayout';
import LoginView from './views/auth/LoginView';
import NotFoundView from './views/error/NotFoundView';
import ServerErrorView from './views/error/ServerErrorView';
import RegisterView from './views/auth/RegisterView';
import PasswordResetView from './views/auth/PasswordResetView';
import ForgotPasswordView from './views/auth/ForgotPasswordView';
import ProfileView from './views/profile/ProfileView';
import OwnProfileView from './views/profile/OwnProfileView';
import DatabaseSearchView from './views/member-database/DatabaseSearchView.js';
import BranchListView from './views/member-database/BranchListView';

import MVPAwardFormView from './views/mvp-award/MVPAwardFormView';

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
            {
                path: 'mvp-award',
                element: <Outlet />,
                children: [
                    {
                        path: 'submissions',
                        element: <Navigate to="/app/mvp-award/" />,
                    },
                    { path: '/', element: <MVPAwardFormView /> },
                ],
            },
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
            { path: 'forgot', element: <ForgotPasswordView /> },
            {
                path: 'reset-password',
                element: <Outlet />,
                children: [
                    { path: ':token', element: <PasswordResetView /> },
                    { path: '/', element: <Navigate to="/forgot" /> },
                ],
            },
            { path: '404', element: <NotFoundView /> },
            { path: '505', element: <ServerErrorView /> },
            { path: '/', element: <Navigate to="/app/profile/me" /> },
            { path: '*', element: <Navigate to="/404" /> },
        ],
    },
];

export default routes;