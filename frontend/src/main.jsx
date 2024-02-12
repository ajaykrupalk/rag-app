import * as React from 'react'
import * as ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from "./components/PageTokenAuth.jsx"
import Upload from "./components/PageUploadFile.jsx";
import Chat from "./components/PageChatInterface.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/upload",
    element: <Upload />
  },
  {
    path: "/chat",
    element: <Chat />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
