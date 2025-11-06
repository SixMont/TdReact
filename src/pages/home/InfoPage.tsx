import { Link, NavLink, Outlet, useMatch } from "react-router-dom"
import { formatIdentifier } from "../../utils/formatText"
import UpgradeTree from "../../components/layout/UpgradeTree"
import BackButton from "../../components/common/BackButton"
import { useEffect } from "react"

export default function InfoPage() {
  const matchEnemy = useMatch("/info/enemy/:id")
  const matchTurret = useMatch("/info/turret/:id")

  const turrets = [
    "circle",
    "ovalHorizontal",
    "ovalVertical",
    "ovalDiagonalLeft",
    "ovalDiagonalRight",
  ]

  const enemies = ["triangle", "square", "pentagon", "hexagon", "heptagon", "octagon"]

  useEffect(() => {
      document.body.classList.add("no-scroll")
      return () => {
        document.body.classList.remove("no-scroll")
      }
    }, [])

  return (
    <div>
      <Link to="/">
        <BackButton />
      </Link>
      <div className="turrets-list">
        {turrets.map((turret) => (
          <NavLink
            key={turret}
            to={`/info/turret/${turret}`}
            className={({ isActive }) =>
              isActive ? "turrets-link-active" : "turrets-link"
            }
          >
            {formatIdentifier(turret)}
          </NavLink>
        ))}
      </div>
      <div className="enemies-list">
        {enemies.map((enemy) => (
          <NavLink
            key={enemy}
            to={`/info/enemy/${enemy}`}
            className={({ isActive }) =>
              isActive ? "turrets-link-active" : "turrets-link"
            }
          >
            {formatIdentifier(enemy)}
          </NavLink>
        ))}
      </div>
      <Outlet />
      {!matchEnemy && !matchTurret && <UpgradeTree />}
    </div>
  )
}
