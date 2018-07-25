import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './Assets/fontawesome/css/all.css';
import AppRoute from './route';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';

import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <AppRoute />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
