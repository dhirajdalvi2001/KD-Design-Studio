import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import FallbackLoader from './components/Loader/FallbackLoader';
import RootLayout from './components/Layout/RootLayout';
import { Suspense, lazy } from 'react';
import './App.css';
import Login from './pages/Auth/Login/Login';
import AuthLayout from './components/Layout/AuthLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products'));
const SingleProduct = lazy(() => import('./pages/Products/SingleProduct'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Error404Page = lazy(() => import('./pages/Error404Page/Error404Page'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/products',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<FallbackLoader />}>
                <Products />
              </Suspense>
            ),
          },
          {
            path: ':slug',
            element: (
              <Suspense fallback={<FallbackLoader />}>
                <SingleProduct />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <RouterProvider router={router} />
      </main>
    </QueryClientProvider>
  );
}

export default App;
