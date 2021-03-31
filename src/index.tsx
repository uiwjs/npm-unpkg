import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@uiw/reset.css';
import Controller from '@uiw-admin/router-control';
import { store } from './models';
import { routers } from './routes/router';
import './index.css';

ReactDOM.render( 
  <Provider store={store}>
    <Controller
      isHashRouter
      routes={routers}
      loadModels={(models = []) => {
        return models.map((m) => {
          return import(`./models/${m}.ts`).then((md) => {
            const modelData = md.default || md;
            store.addModel({ name: m, ...modelData });
          });
        })
      }}
    />
  </Provider>,
  document.getElementById('root'),
);
