import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import { ConfirmProvider } from './components/ConfirmModal.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ConfirmProvider>
                <App />
            </ConfirmProvider>
        </Provider>
    </StrictMode>
);