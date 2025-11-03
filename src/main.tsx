import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/styles/PagesStyles.css"
import "./index.css"
import HomePage from "./pages/home/HomePage.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import TurretsPage from "./pages/home/TurretsPage.tsx"
import NotFoundPage from "./pages/home/NotFoundPage.tsx"
import TurretPage from "./pages/home/TurretPage.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/turrets",
    element: <TurretsPage />,
    children: [
      {
        path: "/turrets/:turretId",
        element: <TurretPage />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
