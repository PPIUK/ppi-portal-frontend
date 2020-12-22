import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.css';

import axios from 'axios';

function App() {
    axios.defaults.baseURL = 'http://localhost:3000';
    const router = useRoutes(routes);
    return <>{router}</>;
}

export default App;
