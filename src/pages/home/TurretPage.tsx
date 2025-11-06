import { Link, useParams } from "react-router-dom"
import { formatIdentifier } from "../../utils/formatText"
import { useState } from "react"
import { turretsData, type TurretKey } from "../../data/turretsData"
import BackButton from "../../components/common/BackButton"

export default function TurretPage() {
  const params = useParams<{ turretId: string }>()
  const [hoveredState, setHoverState] = useState<string | null>(null)

  const isTurretKey = (k: string | undefined): k is TurretKey =>
    !!k && Object.prototype.hasOwnProperty.call(turretsData, k)

  const turret = isTurretKey(params.turretId)
    ? turretsData[params.turretId]
    : null

  return (
    <div className="turret-page">
      <Link to="/info">
        <BackButton />
      </Link>
      <h1 className="turret-title">
        {params.turretId ? formatIdentifier(params.turretId) : "Unknown"} Turret
      </h1>
      <div className="turret-stats">
        <div
          className="turret-stats-center"
          onMouseEnter={() => setHoverState("center")}
          onMouseLeave={() => setHoverState(null)}
        >
          <h3 className="stat-title">Stats Center</h3>
          <div className="stat-row">
            <span className="stat-label">Damage</span>
            <span className="stat-value">{turret?.center.damage}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Range</span>
            <span className="stat-value">{turret?.center.range}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Fire Rate</span>
            <span className="stat-value">{turret?.center.fireRate}</span>
          </div>
        </div>
        {params.turretId ? (
          <div className="turret-image-container">
            <img
              className="turret-image"
              src={
                new URL(
                  `../../assets/images/turrets/${params.turretId}Turret.png`,
                  import.meta.url
                ).href
              }
              alt={`${params.turretId} Turret`}
            />
            <img
              className={`highlight-turret-image-center ${
                hoveredState === "center" ? "active" : ""
              }`}
              src={
                new URL(
                  `../../assets/images/turrets/highlightCenterTurret.png`,
                  import.meta.url
                ).href
              }
              alt={`${params.turretId} Turret`}
            />
            <img
              className={`highlight-turret-image-border ${
                hoveredState === "border" ? "active" : ""
              }`}
              src={
                new URL(
                  `../../assets/images/turrets/highlightBorderTurret${params.turretId}.png`,
                  import.meta.url
                ).href
              }
              alt={`${params.turretId} Turret`}
            />
          </div>
        ) : (
          <p>No turret selected</p>
        )}
        <div
          className="turret-stats-border"
          onMouseEnter={() => setHoverState("border")}
          onMouseLeave={() => setHoverState(null)}
        >
          <h3 className="stat-title">Stats Border</h3>
          <div className="stat-row">
            <span className="stat-label">Multiplier</span>
            <span className="stat-value">{turret?.border.multiplier}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Compatibility</span>
            <span className="stat-value">
              {turret?.border.compatibility.join(" & ")}
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Docking port</span>
            <span className="stat-value">{turret?.border.dockingPort}</span>
          </div>
        </div>
      </div>
      <div className="turret-description">
        <h2>Description</h2>
        <p>
          The {params.turretId ? formatIdentifier(params.turretId) : "Unknown"}{" "}
          turret with {turret?.description ? turret.description : "no description"}.
        </p>
      </div>
    </div>
  )
}
