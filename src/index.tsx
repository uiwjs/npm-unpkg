import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Loader from '@uiw/react-loader';
import { HashRouter, Route, Routes } from 'react-router-dom';
import GitHubCorners from '@uiw/react-github-corners';
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
        {routes.map(({ element: Child, path }, idx) => {
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

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <GitHubCorners size={54} target="_parent" href="https://github.com/uiwjs/npm-unpkg" />
    <App />
  </Provider>
);
