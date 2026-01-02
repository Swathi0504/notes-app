import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import {Provider} from "react-redux";
import store from "./utils/store";
import Allnotes from './components/Allnotes';
import Archived from './components/Archived';
import Trash from './components/Trash';
import Pinned from './components/Pinned';

function App() {
  
  const appRouter = createBrowserRouter([{
    path:"/",
    element: <Body/>,
    children:[
    {
       path: "/",
       element: <Allnotes/>
    },
    {
      path: "/archived",
      element: <Archived/> 
    },
    {
      path: "/pinned",
      element: <Pinned/> 
    },
    {
      path: "/trash",
      element: <Trash/> 
    }
    ]
  }])


  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={appRouter}/>
      </div>
    </Provider>
  );
}

export default App;
