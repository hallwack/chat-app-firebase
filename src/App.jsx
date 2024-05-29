import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    { path: "", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
