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
import AuthorizeView from './views/auth/AuthorizeView';
import ProfileView from './views/profile/ProfileView';
import OwnProfileView from './views/profile/OwnProfileView';
import DatabaseSearchView from './views/member-database/DatabaseSearchView.js';
import BranchListView from './views/member-database/BranchListView';

import MVPAwardFormView from './views/mvp-award/MVPAwardFormView';
import MVPAwardIndexView from './views/mvp-award/MVPAwardIndexView';
import MVPAwardSubmissionView from './views/mvp-award/MVPAwardSubmissionView';

import IsicSciEssayFormView from './views/isic-sci-essay/IsicSciEssayFormView';
import IsicSciEssayFormSubmittedView from './views/isic-sci-essay/IsicSciEssayFormSubmittedView';
import IsicSciEssaySubmissionView from './views/isic-sci-essay/IsicSciEssaySubmissionView';

import ThesisSubmissionView from './views/thesis-bank/submission';
import ThesisMySubmissionsView from './views/thesis-bank/me';
import ThesisSearchView from './views/thesis-bank/search';
import PublicThesesView from './views/thesis-bank/public-root';
import PublicLayout from './views/thesis-bank/layouts/PublicLayout';
import PublicThesisView from './views/thesis-bank/public-thesis';
import ThesisView from './views/thesis-bank/thesis';
import VerifierDashboardView from './views/verifier/VerifierDashboardView';
import VerifierActionView from './views/verifier/VerifierActionView';
import VotingPhaseView from './views/voting/VotingView';

import VotingAdminElectionView from './views/voting/admin/ElectionView';
import VotingAdminSummaryView from './views/voting/admin/SummaryView';
import VotingElectionView from './views/voting/ElectionView';
import VotingNominationView from './views/voting/NominationView';

const routes = [
    {
        path: 'app',
        element: <AppLayout />,
        children: [
            {
                path: 'verifier',
                element: <Outlet />,
                children: [
                    { path: 'dashboard', element: <VerifierDashboardView /> },
                    { path: 'review/:userId', element: <VerifierActionView /> },
                    {
                        path: '/',
                        element: <Navigate to="/app/verifier/dashboard " />,
                    },
                ],
            },
            {
                path: 'voting',
                element: <Outlet />,
                children: [
                    { path: 'admin', element: <VotingAdminSummaryView /> },
                    {
                        path: ':electionID/admin',
                        element: <VotingAdminElectionView />,
                    },
                    {
                        path: ':electionID/nomination',
                        element: <VotingNominationView />,
                    },
                    {
                        path: ':electionID/vote',
                        element: <VotingPhaseView />,
                    },
                    {
                        path: ':electionID/',
                        element: <VotingElectionView />,
                    },
                    {
                        path: '/',
                        element: <Navigate to="/app/profile/me" />,
                    },
                ],
            },
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
                path: 'thesis-bank',
                element: <Outlet />,
                children: [
                    { path: ':thesisId', element: <ThesisView /> },
                    { path: 'search', element: <ThesisSearchView /> },
                    { path: 'me', element: <ThesisMySubmissionsView /> },
                    { path: 'submission', element: <ThesisSubmissionView /> },
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
                        element: <MVPAwardIndexView />,
                    },
                    {
                        path: 'submission/:userID',
                        element: <MVPAwardSubmissionView />,
                    },
                    { path: '/', element: <MVPAwardFormView /> },
                ],
            },
            {
                path: 'essay-isic-sci',
                element: <Outlet />,
                children: [
                    {
                        path: 'submissions',
                        element: <IsicSciEssaySubmissionView />,
                    },
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
            { path: '*', element: <Navigate to="/app/profile/me" /> },
        ],
    },

    {
        path: 'thesis',
        element: <PublicLayout />,
        children: [
            {
                path: '/:id',
                element: <PublicThesisView />,
            },
            {
                path: '/',
                element: <PublicThesesView />,
            },
        ],
    },
    {
        path: 'essay-isic-sci-2021/:id/submitted',
        element: <IsicSciEssayFormSubmittedView />,
    },
    { path: 'essay-isic-sci-2021', element: <IsicSciEssayFormView /> },
    { path: 'authorize', element: <AuthorizeView /> },
];

export default routes;
