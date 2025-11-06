import { Link, useParams } from "react-router-dom"
import { formatIdentifier } from "../../utils/formatText"
import BackButton from "../../components/common/BackButton"
import { useState } from "react"
import { enemiesData, type EnemyKey } from "../../data/enemiesData"

export default function EnemyPage() {
  const params = useParams<{ enemyId: string }>()
  const [hoveredState, setHoverState] = useState<string | null>(null)

  const isEnemyKey = (k: string | undefined): k is EnemyKey =>
      !!k && Object.prototype.hasOwnProperty.call(enemiesData, k)

    const enemy = isEnemyKey(params.enemyId)
      ? enemiesData[params.enemyId]
      : null

  return (
    <div className="turret-page">
      <Link to="/info">
        <BackButton />
      </Link>
      <h1 className="turret-title">
        {params.enemyId ? formatIdentifier(params.enemyId) : "Unknown"} Enemy
      </h1>
      <div className="turret-stats">
        <div
          className="turret-stats-center"
          onMouseEnter={() => setHoverState("reverse")}
          onMouseLeave={() => setHoverState(null)}
        >
          <h3 className="stat-title">Stats Back</h3>
          <div className="stat-row">
            <span className="stat-label">Damage</span>
            <span className="stat-value">{enemy?.center.damage}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Range</span>
            <span className="stat-value">{enemy?.center.range}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Fire Rate</span>
            <span className="stat-value">{enemy?.center.fireRate}</span>
          </div>
        </div>
        {params.enemyId ? (
          <div className="turret-image-container">
            <img
              className={`enemy-image ${
                hoveredState === "reverse" ? "active" : ""
              }`}
              src={
                new URL(
                  `../../assets/images/enemies/${params.enemyId}.png`,
                  import.meta.url
                ).href
              }
              alt={`${params.enemyId} Enemy`}
            />
            <img
              className={`reverse-enemy-image ${
                hoveredState === "reverse" ? "" : "active"
              }`}
              src={
                new URL(
                  `../../assets/images/enemies/${params.enemyId}Reverse.png`,
                  import.meta.url
                ).href
              }
              alt={`${params.enemyId} Enemy Reverse`}
            />
          </div>
        ) : (
          <p>No turret selected</p>
        )}
        <div className="turret-stats-border">
          <h3 className="stat-title">Stats Front</h3>
          <div className="stat-row">
            <span className="stat-label">Multiplier</span>
            <span className="stat-value">{enemy?.border.multiplier}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Compatibility</span>
            <span className="stat-value">
              {enemy?.border.compatibility.join(" & ")}
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Docking port</span>
            <span className="stat-value">{enemy?.border.dockingPort}</span>
          </div>
        </div>
      </div>
      <div className="turret-description">
        <h2>Description</h2>
        <p>
          The {params.enemyId ? formatIdentifier(params.enemyId) : "Unknown"}{" "}
          enemy with {enemy?.description ? enemy.description : "no description"}
          .
        </p>
      </div>
    </div>
  )
}
