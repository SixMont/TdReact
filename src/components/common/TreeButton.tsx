import { Handle, Position } from "reactflow"
import type { NodeProps } from "reactflow"
import type { UpgradesKey } from "../../data/upgradesData"

type TreeButtonProps = { upgrade: UpgradesKey } | NodeProps<{ upgrade: UpgradesKey }>

export default function TreeButton(props: TreeButtonProps) {
  const upgrade = "upgrade" in props ? props.upgrade : props.data?.upgrade

  if (!upgrade) return null

  return (
    <div>
      <div className="upgrade-image-container">
        <img
          key={upgrade}
          className="upgrade-image"
          src={new URL(`../../assets/images/tree/${upgrade}.png`, import.meta.url).href}
          alt={`${upgrade} upgrade`}
        />
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
