import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalStyle from './GlobalStyle';
import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <div>
            <GlobalStyle />
            <ToastContainer />
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);
