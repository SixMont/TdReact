import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/styles/PagesStyles.css"
import "./index.css"
import "reactflow/dist/style.css"
import HomePage from "./pages/home/HomePage.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import InfoPage from "./pages/home/InfoPage.tsx"
import NotFoundPage from "./pages/home/NotFoundPage.tsx"
import TurretPage from "./pages/home/TurretPage.tsx"
import EnemyPage from "./pages/home/EnemyPage.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/info",
    element: <InfoPage />,
    children: [
      {
        path: "/info/turret/:turretId",
        element: <TurretPage />,
      },
      {
        path: "/info/enemy/:enemyId",
        element: <EnemyPage />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
