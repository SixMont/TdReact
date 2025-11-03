import TreeButton from "../common/TreeButton"
import { upgradesData, type UpgradesKey } from "../../data/upgradesData"

export default function UpgradeTree() {
  const upgradeKeys = Object.keys(upgradesData) as UpgradesKey[]
  return (
    <div>
      {upgradeKeys.map((upgrade) => (
        <TreeButton upgrade={upgrade} />
      ))}
    </div>
  )
}
