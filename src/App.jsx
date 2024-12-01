import './App.css';
import { Suspense } from 'react';
import FallbackLoader from './components/Loader/FallbackLoader';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootLayout from './components/Layout/RootLayout';
import AuthLayout from './components/Layout/AuthLayout';
import AdminLayout from './components/Layout/AdminLayout';

// Customer Screens
import Home from './pages/customer-screens/Home/Home';
import Products from './pages/customer-screens/Products/Products';
import SingleProduct from './pages/customer-screens/Products/SingleProduct';
import About from './pages/customer-screens/About/About';
import Contact from './pages/customer-screens/Contact/Contact';

// Common Screens
import Error404Page from './pages/common-screens/Error404Page/Error404Page';
import Login from './pages/common-screens/Auth/Login/Login';

// Admin Screens
import Dashboard from './pages/admin-screens/Dashboard/Dashboard';
import Roles from './pages/admin-screens/ManageUsers/Roles/Roles';

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
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/admin/manage-users/roles',
        element: <Roles />,
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
