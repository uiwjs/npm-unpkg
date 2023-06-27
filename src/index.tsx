import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Loader from '@uiw/react-loader';
import GitHubCorners from '@uiw/react-github-corners';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import '@uiw/reset.css';
import { store } from './models';
import './index.css';
import { routes } from './routers';

const Loading = () => (
  <div style={{ padding: 30 }}>
    <Loader tip="loading..." />
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <GitHubCorners size={54} target="_parent" href="https://github.com/uiwjs/npm-unpkg" />
    <RouterProvider router={createHashRouter(routes)} fallbackElement={<Loading />} />
  </Provider>
);
