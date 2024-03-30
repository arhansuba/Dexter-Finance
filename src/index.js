import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Solana'da da aynı Bootstrap kütüphanesini kullanabilirsiniz
import './styles/GlobalStyles.css'; // Solana için gereken global stilleri içeren CSS dosyası
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals();
