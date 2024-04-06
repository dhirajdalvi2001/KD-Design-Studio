import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FallbackLoader from "./components/Loader/FallbackLoader";
import RootLayout from "./components/Layout/RootLayout";
import { Suspense, lazy } from "react";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Products = lazy(() => import("./pages/Products/Products"));
const SingleProduct = lazy(() => import("./pages/Products/SingleProduct"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: (
    //   <PrivateRoute>
    //     <Error404Page />
    //   </PrivateRoute>
    // ),
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
        path: "/products",
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
            path: ":slug",
            element: (
              <Suspense fallback={<FallbackLoader />}>
                <SingleProduct />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
