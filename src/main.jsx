import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const storedTheme = window.localStorage.getItem('portfolio-theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : prefersLight ? 'light' : 'dark';
const bootTheme = initialTheme === 'light' ? 'light' : 'dark';
document.documentElement.setAttribute('data-theme', bootTheme);
document.body.setAttribute('data-theme', bootTheme);

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);