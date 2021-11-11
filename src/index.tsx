import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Loader from '@uiw/react-loader';
import { HashRouter, Route, Routes } from 'react-router-dom';
import '@uiw/reset.css';
import { store } from './models';
import './index.css';
import { routes } from './routers';

const Loading = (
  <div style={{ padding: 30 }}>
    <Loader tip="loading..." />
  </div>
);

function App() {
  return (
    <HashRouter>
      <Routes>
        {routes.map(({ component: Child, path }, idx) => {
          const Com = Child as any;
          return (
            <Route
              key={idx}
              path={path}
              element={
                <Suspense fallback={Loading}>
                  <Com />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </HashRouter>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
