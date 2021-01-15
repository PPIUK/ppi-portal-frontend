import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css';

import axios from 'axios';

import { AuthProvider } from './utils/useAuth';

function App() {
    axios.defaults.baseURL =
        process.env.NODE_ENV == 'production'
            ? 'https://portal.ppiuk.org'
            : 'http://localhost:3000';
    const router = useRoutes(routes);
    return <AuthProvider>{router}</AuthProvider>;
}

export default App;
