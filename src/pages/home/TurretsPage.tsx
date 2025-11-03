import { NavLink, Outlet } from "react-router-dom"
import { formatIdentifier } from "../../utils/formatText"
import UpgradeTree from "../../components/layout/UpgradeTree"

export default function TurretsPage() {
  const turrets = [
    "circle",
    "ovalHorizontal",
    "ovalVertical",
    "ovalDiagonalLeft",
    "ovalDiagonalRight",
  ]
  return (
    <div>
      <div className="turrets-list">
        {turrets.map((turret) => (
          <NavLink
            key={turret}
            to={`/turrets/${turret}`}
            className={({ isActive }) =>
              isActive ? "turrets-link-active" : "turrets-link"
            }
          >
            {formatIdentifier(turret)}
          </NavLink>
        ))}
      </div>
      <Outlet />
      <UpgradeTree />
    </div>
  )
}
