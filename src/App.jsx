import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FallbackLoader from "./components/Loader/FallbackLoader";
import RootLayout from "./components/Layout/RootLayout";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";
import { Suspense } from "react";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
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
