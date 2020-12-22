import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

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
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('oauth-access-token')
    );
    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem('oauth-refresh-token')
    );

    const signin = (email, password) => {
        return axios
            .post('/api/auth/login', {
                username: email,
                password: password,
                client_id: 'api',
                client_secret: null,
                grant_type: 'password',
            })
            .then((response) => {
                setAccessToken(response.access_token);
                setRefreshToken(response.refresh_token);
                localStorage.setItem(
                    'oauth-access-token',
                    response.access_token
                );
                localStorage.setItem(
                    'oauth-refresh-token',
                    response.refresh_token
                );
                return new Promise((resolve, reject) => {
                    axios
                        .get('/api/profile/me', {
                            headers: {
                                Authorization: `Bearer ${response.access_token}`,
                            },
                        })
                        .then((user) => {
                            setUser(user.data);
                            resolve(
                                response.access_token,
                                response.refresh_token,
                                user.data
                            );
                        })
                        .catch((err) => reject(err));
                });
            });
    };

    const signup = (email, password) => {
        throw {name: "NotImplementedError", message: "WIP"}
    };

    const signout = () => {
        throw {name: "NotImplementedError", message: "WIP"}
    };

    const sendPasswordResetEmail = (email) => {
        throw {name: "NotImplementedError", message: "WIP"}
    };

    const confirmPasswordReset = (code, password) => {
        throw {name: "NotImplementedError", message: "WIP"}
    };

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
    };
}
