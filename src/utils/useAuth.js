/* eslint-disable no-unused-vars */
import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { setRef } from '@material-ui/core';

const authContext = createContext();

export function AuthProvider(props) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {props.children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('oauth-user'))
    );
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('oauth-access-token')
    );
    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem('oauth-refresh-token')
    );

    const signin = (email, password) => {
        return axios
            .post(
                '/api/auth/login',
                qs.stringify({
                    username: email,
                    password: password,
                    client_id: 'api',
                    grant_type: 'password',
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then((response) => {
                setAccessToken(response.data.access_token);
                setRefreshToken(response.data.refresh_token);
                localStorage.setItem(
                    'oauth-access-token',
                    response.data.access_token
                );
                localStorage.setItem(
                    'oauth-refresh-token',
                    response.data.refresh_token
                );
                return axios
                    .get('/api/profiles/me', {
                        headers: {
                            Authorization: `Bearer ${response.data.access_token}`,
                        },
                    })
                    .then((user) => {
                        setUser(user.data.data);
                        localStorage.setItem(
                            'oauth-user',
                            JSON.stringify(user.data.data)
                        );
                        return {
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                            user: user.data.data,
                        };
                    });
            });
    };

    const signup = (_email, _password) => {
        throw { name: 'NotImplementedError', message: 'WIP' };
    };

    const signout = () => {
        return axios
            .post(
                '/api/auth/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((resp) => {
                setUser(null);
                setRefreshToken(null);
                setAccessToken(null);
                localStorage.removeItem('oauth-access-token');
                localStorage.removeItem('oauth-refresh-token');
                localStorage.removeItem('oauth-user');

                return resp;
            });
    };

    const sendPasswordResetEmail = (_email) => {
        throw { name: 'NotImplementedError', message: 'WIP' };
    };

    const confirmPasswordReset = (_code, _password) => {
        throw { name: 'NotImplementedError', message: 'WIP' };
    };

    const renewAccessToken = () =>
        axios
            .post(
                '/api/auth/token',
                qs.stringify({
                    client_id: 'api',
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                })
            )
            .then((resp) => {
                setAccessToken(resp.data.access_token);
                setRefreshToken(resp.data.refresh_token);
                localStorage.setItem(
                    'oauth-access-token',
                    resp.data.access_token
                );
                localStorage.setItem(
                    'oauth-refresh-token',
                    resp.data.refresh_token
                );

                return axios
                    .get('/api/profiles/me', {
                        headers: {
                            Authorization: `Bearer ${resp.data.access_token}`,
                        },
                    })
                    .then((user) => {
                        setUser(user.data.data);
                        localStorage.setItem(
                            'oauth-user',
                            JSON.stringify(user.data.data)
                        );
                        return true;
                    });
            })
            .catch(() => {
                setUser(null);
                setRefreshToken(null);
                setAccessToken(null);
                localStorage.removeItem('oauth-access-token');
                localStorage.removeItem('oauth-refresh-token');
                localStorage.removeItem('oauth-user');

                return null;
            });

    const temporaryTokenSignIn = (token) => {
        return axios
            .post('/api/auth/create-access-token', { token })
            .then((response) => {
                setAccessToken(response.data.access_token);
                setRefreshToken(response.data.refresh_token);
                localStorage.setItem(
                    'oauth-access-token',
                    response.data.access_token
                );
                localStorage.setItem(
                    'oauth-refresh-token',
                    response.data.refresh_token
                );
                return axios
                    .get('/api/profiles/me', {
                        headers: {
                            Authorization: `Bearer ${response.data.access_token}`,
                        },
                    })
                    .then((user) => {
                        setUser(user.data.data);
                        localStorage.setItem(
                            'oauth-user',
                            JSON.stringify(user.data.data)
                        );
                        return {
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                            user: user.data.data,
                        };
                    });
            });
    };

    // renew access token onmount and every 15 minutes
    useEffect(() => {
        renewAccessToken();
    }, []);
    useEffect(() => {
        const renewInterval = setInterval(renewAccessToken, 1000 * 60 * 15);
        return () => clearTimeout(renewInterval);
    }, [refreshToken]);

    // Return the user object and auth methods
    return {
        user,
        accessToken,
        refreshToken,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
        temporaryTokenSignIn,
    };
}
