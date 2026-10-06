import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

const APP_REFRESH_INTERVAL_MS = 30 * 60 * 1000;

export default function App() {
  useEffect(() => {
    const refreshTimer = window.setTimeout(() => {
      window.location.reload();
    }, APP_REFRESH_INTERVAL_MS);

    return () => window.clearTimeout(refreshTimer);
  }, []);

  return <RouterProvider router={router} />;
}
