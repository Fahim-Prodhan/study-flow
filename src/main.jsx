import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./pages/homepage/Homepage.jsx";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import Features from "./pages/features/Features.jsx";
import HowItWorks from "./pages/howItWorks/HowItWorks.jsx";
import Signin from "./pages/signIn/Signin.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import { ToastContainer } from "react-toastify";
import AuthContext from "./context/AuthContext.jsx";
import Private from "./pages/private/Private.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import Subject from "./pages/subject/Subject.jsx";
import Goal from "./pages/goal/Goal.jsx";
import Task from "./pages/task/Task.jsx";
import Focus from "./pages/focus/Focus.jsx";
import Insights from "./pages/insights/Insights.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/private",
        element: (
          <PrivateRoute>
            <Private />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path:"/dashboard",
    element:<PrivateRoute><AdminLayout/></PrivateRoute>,
    children:[
      {
        path:"subject",
        element:<Subject/>
      },
      {
        path:'goal',
        element:<Goal/>
      },
      {
        path:'task',
        element:<Task/>
      },
      {
        path:'focus',
        element:<Focus/>
      },
      {
        path:'insights',
        element:<Insights/>
      }
      
    ]
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      {/* <App /> */}
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthContext>
  </StrictMode>,
);
