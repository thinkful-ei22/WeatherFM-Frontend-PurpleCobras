import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import store from './store';
import './index.css';
import './css/app.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="topCont"><App /></div>
        </Router>
    </Provider>,
    document.getElementById('root')

);
