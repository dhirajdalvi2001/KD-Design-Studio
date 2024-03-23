import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FallbackLoader from "./components/Loader/FallbackLoader";
import RootLayout from "./components/Layout/RootLayout";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";
import { Suspense, useState } from "react";
import Home from "./pages/Home/Home";
import Work from "./pages/Work/Work";
import "./App.css";
import SingleProduct from "./pages/Products/SingleProduct";

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
        path: "/work",
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <Work />
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
  const [count, setCount] = useState(0);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
