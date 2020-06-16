import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from './store'
import { amplifyConfig, oauth } from './config/amplify';
import { Amplify, Auth } from 'aws-amplify';
import Modal from 'react-modal'

Amplify.configure(amplifyConfig)
Auth.configure({oauth})

Modal.setAppElement('#root')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);

