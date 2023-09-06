import { createRoot } from 'react-dom/client';
import React from 'react';
import './i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <div>
        Привет
    </div>,
);
