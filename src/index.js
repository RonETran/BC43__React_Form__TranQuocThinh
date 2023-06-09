import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { store } from './redux/configStore';
import BaiTapForm from './components/BaiTapForm';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BaiTapForm/>
  </Provider>
);


