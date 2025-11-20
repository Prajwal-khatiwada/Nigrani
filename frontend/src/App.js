import './components/fileup'
import Home from './pages/Home'
import Tool from './pages/Tool'
import Suspects from './pages/Suspects'
import Login from './pages/Login'
import Register from './pages/Register'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Home />,
  },
  {
    path: '/tool',
    element: <Tool />,
  },
  {
    path: '/suspects',
    element: <Suspects />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  )
}

export default App
