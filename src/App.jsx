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
import Users from './pages/admin-screens/ManageUsers/Users/Users';
import NewUser from './pages/admin-screens/ManageUsers/Users/NewUser';
import SignUp from './pages/common-screens/Auth/SignUp/SignUp';
import ManageProducts from './pages/admin-screens/ManageProducts/ManageProducts';
import NewProduct from './pages/admin-screens/ManageProducts/NewProduct';

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
      {
        path: '/auth/sign-up',
        element: <SignUp />
      }
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'manage-users/users',
        element: <Users />,
      },
      {
        path: 'manage-users/users/new',
        element: <NewUser />,
      },
      {
        path: 'manage-users/users/:userId',
        element: <NewUser />, 
      },
      {
        path: 'manage-products',
        element: <ManageProducts />,
      },
      {
        path: 'manage-products/new',
        element: <NewProduct />,
      },
      {
        path: 'manage-products/:productId',
        element: <NewProduct />, 
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
