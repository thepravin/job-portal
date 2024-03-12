
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import NotFound from "./components/NotFound/NotFound";
import App from './App';
import { Provider } from 'react-redux';
import store from './Utils/Store';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
        children: [],
      },
      {
        path: "/job/getall",
        element: <Jobs />,
        children: [],
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
        children: [],
      },
      {
        path: "/application/:id",
        element: <Application />
      }, {
        path: "/applications/me",
        element: <MyApplications />
      },
      {
        path: "/job/post",
        element: <PostJob />
      },
      {
        path: "/job/me",
        element: <MyJobs />
      }, {
        path: "*",
        element: <NotFound />
      }
    ],
  },


])

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>

)